export type Account = {
  id: number;
  user_id: number;
  currency_id: number;
  account_name: string;
  account_number: string;
  account_type: string;
  organization: string;
  account_comments?: string;
  currency_name?: string;
  currency_symbol?: string;
  decimal?: number;
  total_amount?: number;
  entries?: any[];
  prices?: any;
}

export type AccountCreateParams = {
  user: number;
  account_currency: number;
  account_name: string;
  account_number: string;
  account_type: string;
  organization: string;
  comments?: string;
}

export type AccountUpdateParams = {
  id: number;
  account_name: string;
  account_number: string;
  account_type: string;
  organization: string;
  account_comments?: string;
} 