import React, { useState } from 'react'
import { filter_panel } from './Filter.style';

function Filter(props: any) {
  const { searchTerm, onSearchChange } = props.searchProps;
  const { governmentFormOptions, selectedGovernmentForm, onValueChangeGovernmentForm } = props.governmentFormProps;
  const { continentOptions, selectedContinent, onValueChangeContinent } = props.continentProps;
  const { currencyOptions, selectedCurrency, onValueChangeCurrency } = props.currencyProps;
  const { languageOptions, selectedLanguage, onValueChangeLanguage } = props.languageProps;
  const { selectedWritingDirection, onValueChangeWritingDirection } = props.writingDirectionProps;
  const { selectedGDPRange, onValueChangeGDPRange } = props.gdpRangeProps;
  const { selectedAreaRange, onValueChangeAreaRange } = props.areaRangeProps;
  const { selectedPopulationRange, onValueChangePopulationRange } = props.populationRangeProps;
  
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
        <option value="">All Languages</option>
        {languageOptions?.map((language: any) => (
          <option key={language} value={language}>{language}</option>
        ))}
      </select> 
      
      <select value={selectedWritingDirection} onChange={onValueChangeWritingDirection}>
        <option value="">All Writing Direction</option>
        <option value="true">Right to Left</option>
        <option value="false">Left to Right</option>
      </select> 

      <select value={selectedGDPRange} onChange={onValueChangeGDPRange}>
        <option value="">All GDP Ranges</option>
        <option value="low">Low (less than 100 billion)</option>
        <option value="medium">Medium (between 100 billion - 1 trillion)</option>
        <option value="high">High (greater than 1 trillion)</option>
      </select>
      
      <select value={selectedAreaRange} onChange={onValueChangeAreaRange}>
        <option value="">All Area Ranges</option>
        <option value="tiny">Tiny (less than 100.000 km2)</option>
        <option value="small">Small (between 100.000 km2 - 400.000 km2)</option>
        <option value="medium">Medium (between 400.000 km2 - 700.000 km2)</option>
        <option value="big">High (between 700.000 km2 - 1.000.000 km2)</option>
        <option value="giant">Giant (more than 1.000.000 km2)</option>
      </select>
      
      <select value={selectedPopulationRange} onChange={onValueChangePopulationRange}>
        <option value="">All Population Ranges</option>
        <option value="sparse">Sparse (less than 10 million)</option>
        <option value="medium">Medium (between 10 million - 100 million)</option>
        <option value="crowded">crowded (between 100 million - 250 million)</option>
        <option value="very crowded">very crowded (more than 250 million)</option>
      </select>
    </div>  
  )
}

export default Filter
