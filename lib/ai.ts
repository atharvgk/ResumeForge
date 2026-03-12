const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.1-8b-instant';

/**
 * Strips null bytes and ASCII control characters from user-supplied text
 * before it is embedded into AI prompts, reducing prompt-injection surface.
 */
function sanitizeInput(text: string): string {
  // Remove null bytes, ASCII control chars (except tab/newline/CR), and common
  // prompt-injection delimiters that could break out of instructional framing.
  return text
    .replace(/\0/g, '')                // null bytes
    .replace(/[\x01-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // ASCII control chars
    .trim();
}

/**
 * Strips common AI preamble lines that models add before the actual content,
 * e.g. "Here's a summary for John:", "Sure! Here is the enhanced version:", etc.
 */
function stripPreamble(text: string): string {
  const lines = text.split('\n');
  const preamblePattern = /^(here'?s?|here is|sure[,!]?|certainly[,!]?|of course[,!]?|below is|i'?ve|i have|the following|this is|please find|as requested)/i;

  // Drop leading lines that look like preamble:
  // - match common intro phrases, OR
  // - are a short sentence ending with a colon (label lines like "Professional summary:")
  let start = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // skip blank lines at top
    if (preamblePattern.test(line) || (line.endsWith(':') && line.split(' ').length <= 12)) {
      start = i + 1;
    } else {
      break;
    }
  }

  return lines.slice(start).join('\n').replace(/\*/g, '').trim();
}

async function chat(prompt: string): Promise<string> {
  const res = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: string };
    const error = Object.assign(new Error('Groq error'), { status: res.status, body: err });
    throw error;
  }

  const data = await res.json() as { choices?: { message?: { content?: string } }[] };
  return stripPreamble(data.choices?.[0]?.message?.content ?? '');
}

export async function getAISuggestions(
  section: string,
  content: string,
  jobDescription?: string
): Promise<string[]> {
  const safeSection = sanitizeInput(section);
  const safeContent = sanitizeInput(content);
  const safeJobDesc = jobDescription ? sanitizeInput(jobDescription) : undefined;

  const prompt = `You are a senior recruiter and ATS optimization expert at a top-tier tech company. Your goal is to help candidates get past automated screening systems AND impress human recruiters.

Analyze the following resume ${safeSection} section and provide exactly 3 highly specific, actionable improvement suggestions.

Resume ${safeSection}:
${safeContent}

${safeJobDesc ? `Target Job Description:\n${safeJobDesc}\n` : ''}

Your suggestions must:
- Target ATS keyword gaps: identify missing industry-standard keywords, tools, or technologies that ATS systems scan for
- Apply the CAR framework (Challenge, Action, Result): suggest adding quantifiable outcomes (%, $, time saved, scale)
- Improve recruiter impact: make the content scannable in 6 seconds, front-load the most impressive details
- Use strong action verbs (Led, Architected, Scaled, Reduced, Delivered) instead of passive language
- Be role-specific and avoid generic advice

Return exactly 3 suggestions as a JSON array of strings. Only return the JSON array, nothing else.
Example: ["Suggestion 1", "Suggestion 2", "Suggestion 3"]`;

  const text = await chat(prompt);
  try {
    const match = text.match(/\[[\s\S]*\]/);
    const suggestions = JSON.parse(match ? match[0] : text) as string[];
    if (Array.isArray(suggestions)) return suggestions.slice(0, 3);
  } catch {
    return text.split('\n').filter((l: string) => l.trim().length > 0).slice(0, 3);
  }
  return [];
}

export async function enhanceContent(
  section: string,
  content: string,
  jobDescription?: string
): Promise<string> {
  const safeSection = sanitizeInput(section);
  const safeContent = sanitizeInput(content);
  const safeJobDesc = jobDescription ? sanitizeInput(jobDescription) : undefined;

  const prompt = `You are a senior technical resume writer and ATS optimization specialist who has helped thousands of candidates land roles at FAANG and top startups. Rewrite the following resume ${safeSection} content to maximize both ATS score and recruiter impact.

Original content:
${safeContent}

${safeJobDesc ? `Target Job Description:\n${safeJobDesc}\n` : ''}

Rewriting rules — follow ALL of these:
- Voice: write as the person proudly owning their achievements — use direct ownership language (Built, Designed, Delivered, Achieved, Grew, Led, Shipped). The reader should feel this person is confidently claiming credit for real impact, not just listing duties
- No "I" pronoun: start bullets/sentences directly with the action verb (e.g. "Engineered a..." not "I engineered a...")
- ATS optimization: naturally weave in industry-standard keywords and tools relevant to the role; avoid keyword stuffing
- Quantify everything possible: add realistic metrics (e.g. "reduced load time by 40%", "served 10k+ users", "cut deployment time from 2 hours to 15 minutes") — if exact numbers are unknown, use plausible ranges that feel authentic
- Power verbs: start every bullet with a strong action verb (Engineered, Architected, Optimized, Delivered, Spearheaded, Scaled, Automated, Reduced, Increased, Designed)
- CAR framework: structure bullets as Action + Technology/Method + Measurable Result
- Brevity: keep each bullet under 2 lines; remove filler words ("responsible for", "helped with", "worked on", "assisted in")
- No markdown: do not use asterisks (*), hashes (#), or any formatting characters
- Preserve the original format: if input is a paragraph return a paragraph; if bullets return bullets (one per line, no dashes or dots)
- Return ONLY the rewritten content, no explanations, no labels, no preamble`;

  return chat(prompt);
}

export async function generateSummary(
  name: string,
  experiences: { position: string; company: string; bullets: string[] }[],
  skills: string[],
  projects: { name: string; description: string; technologies: string[] }[],
): Promise<string> {
  const safeName = sanitizeInput(name);
  const expLines = experiences.map(e =>
    `${sanitizeInput(e.position)} at ${sanitizeInput(e.company)}${e.bullets.length ? ': ' + e.bullets.slice(0, 2).map(sanitizeInput).join('; ') : ''}`
  ).join('\n');

  const projLines = projects.map(p =>
    `${sanitizeInput(p.name)} (${p.technologies.map(sanitizeInput).join(', ')}): ${sanitizeInput(p.description)}`
  ).join('\n');

  const prompt = `You are a senior technical recruiter and resume branding expert who has reviewed 10,000+ resumes at top tech companies. Write a powerful 2-3 sentence professional summary for ${safeName || 'this candidate'} that will instantly hook both ATS systems and human recruiters.

Work Experience:
${expLines || 'None'}

Projects:
${projLines || 'None'}

Skills: ${skills.map(sanitizeInput).join(', ')}

Rules for the perfect summary:
- Voice: write as the person confidently owning and showcasing their achievements — the tone should feel like someone who knows their worth and is proud of what they have built and delivered, not a bland third-party bio
- No "I" pronoun needed: open directly with their role/identity (e.g. "Full-Stack Engineer who architected..." or "Backend Engineer with a proven track record of...")
- Hook immediately: lead with their strongest identity + biggest achievement signal (e.g. "Full-Stack Engineer with 3+ years shipping production-grade SaaS platforms serving 50k+ users")
- Achievement-first: every sentence must highlight something they built, improved, shipped, or delivered — not just responsibilities or buzzwords
- ATS keywords: include the most in-demand technologies from their stack naturally in the text
- Quantify impact: mention scale, outcomes, or scope wherever possible (users served, performance gains, systems built, team size)
- Recruiter magnet: close with their unique value or what they bring to a team
- Length: 2-3 sentences maximum, tight and punchy — no fluff, no filler
- No markdown: no asterisks, no bold, no bullet points
- Return ONLY the summary text, nothing else`;

  return chat(prompt);
}

export async function calculateATSScore(
  resumeText: string,
  jobDescription: string
): Promise<{ score: number; feedback: string[] }> {
  const prompt = `Analyze this resume against the job description and provide an ATS compatibility score.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return a JSON object with this exact format:
{"score": <number 0-100>, "feedback": ["feedback point 1", "feedback point 2", "feedback point 3"]}

Only return the JSON object, nothing else.`;

  const text = await chat(prompt);
  try {
    const match = text.match(/\{[\s\S]*\}/);
    return JSON.parse(match ? match[0] : text) as { score: number; feedback: string[] };
  } catch {
    return { score: 0, feedback: ['Unable to analyze resume at this time.'] };
  }
}

export async function suggestSkills(
  experiences: { position: string; company: string; description: string; bullets: string[] }[],
  projects: { name: string; description: string; technologies: string[] }[],
  existingSkills: string[],
): Promise<string[]> {
  const expLines = experiences.map(e => {
    const details = [e.description, ...e.bullets].filter(Boolean).map(sanitizeInput).join(' ');
    return `Role: ${sanitizeInput(e.position)} at ${sanitizeInput(e.company)}. ${details}`;
  }).join('\n');

  const projLines = projects.map(p =>
    `Project: ${sanitizeInput(p.name)}. Tech stack: ${p.technologies.map(sanitizeInput).join(', ')}. Description: ${sanitizeInput(p.description)}`
  ).join('\n');

  const safeExisting = existingSkills.map(sanitizeInput);
  const existing = safeExisting.length > 0
    ? `Already listed skills (DO NOT include these): ${safeExisting.join(', ')}`
    : 'No existing skills yet.';

  const prompt = `You are a technical resume expert and ATS specialist. Analyze the work experiences and projects below and suggest the most impactful technical skills to add to this resume.

Your goal: maximize ATS match rate and signal strong technical depth to recruiters.

Work Experience:
${expLines || 'None'}

Projects:
${projLines || 'None'}

${existing}

Rules:
- Extract ALL explicit technologies mentioned: languages, frameworks, libraries, databases, DevOps tools, cloud platforms, APIs, testing frameworks
- Infer industry-standard companion skills (e.g. React → JavaScript, TypeScript; Django → Python, REST API; Docker → Kubernetes, CI/CD)
- Include in-demand ATS keywords that recruiters commonly filter for in this tech stack
- Add relevant methodologies if implied (e.g. "Agile", "REST API Design", "Microservices", "System Design", "CI/CD")
- Prioritize skills with the highest job market demand in this domain
- Do NOT include soft skills like "Problem Solving", "Communication", "Teamwork", "Leadership"
- Do NOT repeat any already-listed skills
- Return between 8 and 15 skills, ordered by relevance/demand (most important first)
- Return ONLY a JSON array of strings, nothing else. Example: ["React", "TypeScript", "Node.js"]`;

  const text = await chat(prompt);
  try {
    const match = text.match(/\[[\s\S]*\]/);
    const parsed = JSON.parse(match ? match[0] : text) as string[];
    if (Array.isArray(parsed)) {
      // Final dedup against existing skills (case-insensitive safety net)
      const existingLower = new Set(safeExisting.map(s => s.toLowerCase()));
      return parsed
        .filter(s => typeof s === 'string' && s.trim().length > 0)
        .filter(s => !existingLower.has(s.trim().toLowerCase()))
        .slice(0, 15);
    }
  } catch { /* fall through */ }
  return [];
}