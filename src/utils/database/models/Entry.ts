export type Entry = {
  id: number;
  entry_id?: number;
  account_id: number;
  category_id: number;
  payment_type: string;
  amount: number;
  entry_type: string;
  payment_concept: string;
  comment?: string;
  emissor?: string;
  email?: string;
  phone?: string;
  status?: string;
  frecuency_type?: string;
  frecuency_time?: string;
  status_level?: string;
  date: Date;
  limit_date?: Date;
  prices?: Record<string, {op: string; value: number}>
  currency_id?: number;
  currency_symbol?: string;
  currency_name?: string;
  currency_decimal?: number;
  decimal?: number;
}

export type EntryCreateParams = {
  entry_id?: number;
  account_id: number;
  category_id: number;
  payment_type: string;
  amount: number;
  entry_type: string;
  payment_concept: string;
  comment?: string;
  emissor?: string;
  email?: string;
  phone?: string;
  status?: string;
  frecuency_type?: string;
  frecuency_time?: string;
  status_level?: string;
  date: Date;
  limit_date?: Date;
  prices?: Record<string, {op: string; value: number}>
  currency_id?: number;
}

export type EntryUpdateParams = {
  id: number;
  entry_id?: number;
  account_id: number;
  category_id: number;
  payment_type: string;
  amount: number;
  entry_type: string;
  payment_concept: string;
  comment?: string;
  emissor?: string;
  email?: string;
  phone?: string;
  status?: string;
  frecuency_type?: string;
  frecuency_time?: string;
  status_level?: string;
  date: Date;
  limit_date?: Date;
  prices?: Record<string, {op: string; value: number}>
  currency_id?: number;
} 