export interface CountryPart1 {
  name: string;
  capital: string;
  phone: number;
  code: string;
  currency: string;
  emoji: string;
  continent: Continent
  languages: Language[]
}

interface Continent {
  name: string;
}

interface Language {
  name: string;
  rtl: boolean;
}
