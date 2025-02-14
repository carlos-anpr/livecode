export interface EditorFile {
  id: string;
  name: string;
  language: string;
  content: string;
  images?: ImageFile[];
  description?: string;
  tags?: string[];
  favorite?: boolean;
}

export interface SavedDesign {
  id: string;
  name: string;
  description?: string;
  html: string;
  css: string;
  javascript: string;
  images: ImageFile[];
  created_at: string;
  updated_at: string;
  favorite: boolean;
  tags: string[];
  screenshot?: string | null;
  shareWithCommunity?: boolean;
}

export interface ImageFile {
  id: string;
  preview: string;
  file: File;
  originalSize: number;
  compressedSize: number;
  originalName: string;
}
