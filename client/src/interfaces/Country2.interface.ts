export interface CountryPart2 {
  _id: string;
  country_name: string;
  flag_url: string;
  silhouette_url: string;
  area: number;
  population: number;
  currency_sign: string;
  gdp: number;
  form_of_government: string;
  background: Background
}

export interface Background{
  direction: string;
  colors: string[];
}
