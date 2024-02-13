import React from 'react'
import { Country } from '../../interfaces/Country.interface';
import { prepareDeduplicatedData } from '../../utils/getFormsOfGovernment';
import { filter_panel } from './Filter.style';

function Filter(props: any) {
  const { searchTerm, onSearchChange } = props.searchProps;
  const { governmentFormOptions, selectedGovernmentForm, onValueChangeGovernmentForm } = props.governmentFormProps;
  const { continentOptions, selectedContinent, onValueChangeContinent } = props.continentProps;
  const { currencyOptions, selectedCurrency, onValueChangeCurrency } = props.currencyProps;
  const { languageOptions, selectedLanguage, onValueChangeLanguage } = props.languageProps;
  
  return (
    <div style={filter_panel}>
      <input
        type="text"
        placeholder="Search by country name.."
        value = {searchTerm}
        onChange={onSearchChange}
      />

      <select value={selectedGovernmentForm} onChange={onValueChangeGovernmentForm}>
        <option value="">All Government Forms</option>
        {governmentFormOptions.map((government_form: string) => (
          <option key={government_form} value={government_form}>{government_form}</option>
        ))}
      </select>

       <select value={selectedContinent} onChange={onValueChangeContinent}>
        <option value="">All Continents</option>
        {continentOptions?.map((continent: string) => (
          <option key={continent} value={continent}>{continent}</option>
        ))}
      </select>

      <select value={selectedCurrency} onChange={onValueChangeCurrency}>
        <option value="">All Currencies</option>
        {currencyOptions?.map((currency: string) => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select> 
      
      <select value={selectedLanguage} onChange={onValueChangeLanguage}>
        <option value="">All Currencies</option>
        {languageOptions?.map((language: string) => (
          <option key={language} value={language}>{language}</option>
        ))}
      </select> 
    </div>  
  )
}

export default Filter
