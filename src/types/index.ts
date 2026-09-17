export interface Service {
  id: string;
  num: string;
  name: string;
  description: string;
}

export interface TaxBracket {
  rate: number;
  min: number;
  max: number;
  base: number;
}

export interface TaxBracketMap {
  single: TaxBracket[];
  married: TaxBracket[];
  hoh: TaxBracket[];
}

export type FilingStatus = 'single' | 'married' | 'hoh';

export interface Seminar {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: string;
  location: string;
  notes: string;
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  initials: string;
  name: string;
  role: string;
  bio: string;
  placeholder?: boolean;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  honeypot?: string;
}

export interface TaxCalcResult {
  taxableIncome: number;
  federalTax: number;
  effectiveRate: number;
  marginalRate: number;
}
