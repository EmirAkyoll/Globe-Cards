export interface CountryPart1 {
  name: string;
  capital: string;
  phone: number;
  code: string;
  native: string;
  currency: string;
  emoji: string;
  continent: Continent
  languages: Language[]
}

export interface Continent {
  name: string;
}

export interface Language {
  name: string;
  rtl: boolean;
}
