export type User = {
  id: number;
  currency_id: number;
  username: string;
  picture?: string;
  language?: string;
  notification_token?: string;
}

export type UserCreateParams = {
  currency_id: number;
  username: string;
  picture?: string;
  language?: string;
  notification_token?: string;
}

export type UserUpdateParams = {
  id: number;
  currency_id?: number;
  username?: string;
  picture?: string;
  language?: string;
  notification_token?: string;
} 