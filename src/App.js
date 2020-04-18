
import classes from './App.module.css';
import image from './image/image.png';
import React, { Component } from 'react'
import { Cards, Charts, CountryPicker } from './component'


import { fetchData } from './api'

class App extends Component {

  state = {
    data: {},
    countries: ''
  }

  async componentDidMount() {

    const fetchDataFromApi = await fetchData();
    this.setState({ data: fetchDataFromApi })

  }

  countriesChangedHandler = async (country) => {
    const fetchDataFromApi = await fetchData(country);
    this.setState({ data: fetchDataFromApi, countries: country })
  }


  render() {

    const { data, countries } = this.state
    return (
      <div className={classes.container}>
        <img className={classes.image} src={image} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker countriesChangedHandler={this.countriesChangedHandler} />
        <Charts data={data} countries={countries} />

      </div>
    )
  }
}

export default App



