// categoryTypes.ts

export interface Category {
  id: number;
  name: string;
  uuid: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
