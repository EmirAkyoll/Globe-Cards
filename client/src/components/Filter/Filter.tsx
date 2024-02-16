import React, { useState } from 'react'
import { filter_panel, selection, option, search_box } from './Filter.style';

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
        style={search_box}
        type="text"
        placeholder="Search by country name.."
        value = {searchTerm}
        onChange={onSearchChange}
      />

      <div>
      <h2 style={{ textAlign: 'center', marginBottom: '0px' }}>Filters</h2>
      <select style={selection} value={selectedGovernmentForm} onChange={onValueChangeGovernmentForm}>
        <option value="">All Government Forms</option>
        {governmentFormOptions.map((government_form: string) => (
          <option style={option} key={government_form} value={government_form}>{government_form}</option>
        ))}
      </select>

      <select style={selection} value={selectedContinent} onChange={onValueChangeContinent}>
        <option value="">All Continents</option>
        {continentOptions?.map((continent: string) => (
          <option style={option} key={continent} value={continent}>{continent}</option>
        ))}
      </select>

      <select style={selection} value={selectedCurrency} onChange={onValueChangeCurrency}>
        <option value="">All Currencies</option>
        {currencyOptions?.map((currency: string) => (
          <option style={option} key={currency} value={currency}>{currency}</option>
        ))}
      </select> 
      
      <select style={selection} value={selectedLanguage} onChange={onValueChangeLanguage}>
        <option value="">All Languages</option>
        {languageOptions?.map((language: any) => (
          <option style={option} key={language} value={language}>{language}</option>
        ))}
      </select> 
      
      <select style={selection} value={selectedWritingDirection} onChange={onValueChangeWritingDirection}>
        <option style={option} value="">All Writing Direction</option>
        <option style={option} value="true">Right to Left</option>
        <option style={option} value="false">Left to Right</option>
      </select> 

      <select style={selection} value={selectedGDPRange} onChange={onValueChangeGDPRange}>
        <option style={option} value="">All GDP Ranges</option>
        <option style={option} value="low">Low (less than 100 billion)</option>
        <option style={option} value="medium">Medium (between 100 billion - 1 trillion)</option>
        <option style={option} value="high">High (greater than 1 trillion)</option>
      </select>
      
      <select style={selection} value={selectedAreaRange} onChange={onValueChangeAreaRange}>
        <option style={option} value="">All Area Ranges</option>
        <option style={option} value="tiny">Tiny (less than 100.000 km2)</option>
        <option style={option} value="small">Small (between 100.000 km2 - 400.000 km2)</option>
        <option style={option} value="medium">Medium (between 400.000 km2 - 700.000 km2)</option>
        <option style={option} value="big">High (between 700.000 km2 - 1.000.000 km2)</option>
        <option style={option} value="giant">Giant (more than 1.000.000 km2)</option>
      </select>
      
      <select style={selection} value={selectedPopulationRange} onChange={onValueChangePopulationRange}>
        <option style={option} value="">All Population Ranges</option>
        <option style={option} value="sparse">Sparse (less than 10 million)</option>
        <option style={option} value="medium">Medium (between 10 million - 100 million)</option>
        <option style={option} value="crowded">Crowded (between 100 million - 250 million)</option>
        <option style={option} value="very crowded">Very Crowded (more than 250 million)</option>
      </select>
      </div>
    </div>  
  )
}

export default Filter
