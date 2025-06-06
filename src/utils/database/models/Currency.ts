export type Currency = {
  id: number;
  symbol: string;
  name: string;
  type: string;
  decimal: number;
  address?: string;
  network?: string;
  image?: string;
}

export type CurrencyCreateParams = {
  symbol: string;
  name: string;
  type: string;
  decimal: number;
  address?: string;
  network?: string;
  image?: string;
}

export type CurrencyUpdateParams = {
  id: number;
  symbol?: string;
  name?: string;
  type?: string;
  decimal?: number;
  address?: string;
  network?: string;
  image?: string;
} 