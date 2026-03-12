import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function getAISuggestions(
  section: string,
  content: string,
  jobDescription?: string
): Promise<string[]> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `You are a professional resume writer. Given the following resume ${section} section content${jobDescription ? ' and job description' : ''}, provide 3 specific improvement suggestions.

Resume ${section}:
${content}

${jobDescription ? `Job Description:\n${jobDescription}\n` : ''}

Return exactly 3 concise, actionable suggestions as a JSON array of strings. Example format:
["Suggestion 1", "Suggestion 2", "Suggestion 3"]

Only return the JSON array, nothing else.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  try {
    const suggestions = JSON.parse(text);
    if (Array.isArray(suggestions)) {
      return suggestions.slice(0, 3);
    }
  } catch {
    // fallback: extract lines
    return text
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .slice(0, 3);
  }

  return [];
}

export async function enhanceContent(
  section: string,
  content: string,
  jobDescription?: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `You are a professional resume writer. Rewrite and enhance the following resume ${section} content to be more impactful, professional, and ATS-friendly${jobDescription ? ', tailored to the job description' : ''}.

Original content:
${content}

${jobDescription ? `Job Description:\n${jobDescription}\n` : ''}

Return only the enhanced content, without any explanation or additional text.`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}

export async function generateSummary(
  experiences: string[],
  skills: string[],
  jobTitle?: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Write a compelling 2-3 sentence professional summary for a resume.

${jobTitle ? `Target job title: ${jobTitle}` : ''}
Experience highlights: ${experiences.join('; ')}
Key skills: ${skills.join(', ')}

Return only the summary text, without any explanation.`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}

export async function calculateATSScore(
  resumeText: string,
  jobDescription: string
): Promise<{ score: number; feedback: string[] }> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Analyze this resume against the job description and provide an ATS compatibility score.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return a JSON object with this exact format:
{"score": <number 0-100>, "feedback": ["feedback point 1", "feedback point 2", "feedback point 3"]}

Only return the JSON object, nothing else.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  try {
    return JSON.parse(text);
  } catch {
    return { score: 0, feedback: ['Unable to analyze resume at this time.'] };
  }
}
