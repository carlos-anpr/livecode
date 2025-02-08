export interface EditorFile {
  id: string;
  name: string;
  language: string;
  content: string;
}

export type Language = 'html' | 'css' | 'javascript';