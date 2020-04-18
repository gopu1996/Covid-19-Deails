import React, { useState, useEffect } from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'
import { fetchCountries } from '../../api'
import classes from './CountryPicker.module.css'

const CountryPicker = ({ countriesChangedHandler }) => {

  const [fetchCountry, setFetchCountry] = useState([])

  useEffect(() => {
    const fetchCountriesApi = async () => {
      setFetchCountry(await fetchCountries())
    }
    fetchCountriesApi()
  }, [setFetchCountry])

  return (
    <FormControl className={classes.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => { countriesChangedHandler(e.target.value) }}>
        <option value="">Global</option>
        {fetchCountry.map((country, i) =>
          <option key={i} value={country} >{country}</option>)}
      </NativeSelect>
    </FormControl>
  )
}
export default CountryPicker
