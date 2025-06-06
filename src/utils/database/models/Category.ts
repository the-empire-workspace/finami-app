export type Category = {
  id: number;
  name: string;
  comment?: string;
  type: string;
  date: Date;
}

export type CategoryCreateParams = {
  name: string;
  comment?: string;
  type: string;
  date?: Date;
}

export type CategoryUpdateParams = {
  id: number;
  name?: string;
  comment?: string;
  type?: string;
  date?: Date;
} 