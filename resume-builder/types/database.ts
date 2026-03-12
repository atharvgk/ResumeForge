export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  __InternalSupabase: {
    PostgrestVersion: '12';
  };
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      resumes: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          data: Json;
          created_at: string;
          updated_at: string;
          is_public: boolean;
          slug: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          data: Json;
          created_at?: string;
          updated_at?: string;
          is_public?: boolean;
          slug?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          data?: Json;
          updated_at?: string;
          is_public?: boolean;
          slug?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
