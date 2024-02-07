import { gql } from "@apollo/client";

export const GET_ALL_COUNTRIES = gql`
  query GetAllCountries {
    countries {
      name
      native
      capital
      phone
      code
      currency
      emoji
      continent {
        name
      }
      languages {
        code
        name
        native
        rtl
      }
    }
  }
`;
