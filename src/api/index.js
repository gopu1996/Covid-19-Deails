
import axios from 'axios'

const url ='https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changedUrl = url;

    if(country){
        changedUrl = `${url}/countries/${country}`
    }
    
    try {

        const {data : { confirmed , recovered , deaths , lastUpdate} }= await axios.get(changedUrl);
       return {confirmed , recovered , deaths , lastUpdate} 
    } catch (error) {
        return error
    }
}

export const fetchDailyData  = async () =>{
    try {
    const {data} = await axios.get(`${url}/daily`)
    const modifieData = data.map((dailyData) => ({
        confirmed: dailyData.confirmed.total,
        deaths:dailyData.deaths.total,
        date: dailyData.reportDate,
    }))

    return modifieData

    } catch (error) {
        return error
    }
}

export const fetchCountries = async () =>{
    try {
        const {data :{countries}} = await axios.get(`${url}/countries`)

        return countries.map((country)=> country.name)
        
    } catch (error) {
        
    }
}

export const stateDataOfIndia = async () =>{
    try {
        const {data :{statewise}} = await axios.get('https://api.covid19india.org/data.json')

        const modifieData = statewise.map((stateData) =>({
            active: stateData.active,
            confirmed: stateData.confirmed,
            deaths: stateData.deaths,
            recovered: stateData.recovered,
            state:stateData.state,
            lastUpdate: stateData.lastupdatedtime
        }))
        return modifieData
    } catch (error) {
        
    }
}