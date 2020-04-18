import React, { useState, useEffect } from 'react'
import { fetchDailyData, stateDataOfIndia } from '../../api'
import { Line, Bar } from 'react-chartjs-2'
import classes from './Chart.module.css'
import IndiaState from './IndiaDetailStateWise/IndiaState'

const Chart = ({ data: { confirmed, deaths, recovered }, countries }) => {
    const [dailyData, setDailyData] = useState({});   //this is use  for line chart

    useEffect(() => {
        const fetchApi = async () => {
            setDailyData(await fetchDailyData());

        }
        fetchApi()
    }, [])


    const [stateData, setStateDate] = useState([]);

    useEffect(() => {
        const fetchState = async () => {
            setStateDate(await stateDataOfIndia())
        }
        fetchState();
    }, [])


    const stateChartOfIndia = (
        stateData.length ? (
            <Line
                data={{

                    labels: stateData.map(({ state }) => state),
                    datasets: [{
                        data: stateData.map(({ confirmed }) => confirmed),
                        label: 'confirmed',
                        borderColor: '#3333ff',
                        backgroundColor: 'rgba(0,0,255,0.3)',
                        fill: true,
                    }, {
                        data: stateData.map(({ active }) => active),
                        label: 'Active',
                        borderColor: 'yellow',
                        backgroundColor: '#ffbf00',
                        fill: true,
                    }, {
                        data: stateData.map(({ recovered }) => recovered),
                        label: 'Recovered',
                        borderColor: '##0080ff',
                        backgroundColor: '#00bfff',
                        fill: true,
                    }, {
                        data: stateData.map(({ deaths }) => deaths),
                        label: 'deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255,0,0,0.6)',
                        fill: true
                    }
                    ]
                }}
            />
        ) : null
    )

    const lineChart = (
        dailyData.length ? (
            <Line
                data={{
                    labels: dailyData.map(({ date }) => new Date(date).toDateString()),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        backgroundColor: 'rgba(0,0,255,0.3)',
                        fill: true
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255,0,0,0.6)',
                        fill: true
                    }]
                }}
            />) : null
    );

    const barChat = (
        confirmed ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'people',
                        backgroundColor: [
                            'rgba(0, 0,255, 0.5)',
                            'rgba(0, 255,0, 0.5)',
                            'rgba(255,0,0, 0.5)'
                        ],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `current stats in ${countries}` }
                }}
            />
        ) : null


    )

    return (

        <div className={classes.container}>
            <div>
                {countries ? barChat : lineChart}
            </div>
            <div className={classes.indiaChart}>
             <h1 style={{textAlign: "center"}}>India Covid Graph </h1>
                {stateChartOfIndia}
            </div>
            <div className={classes.stateGrid}>
                <IndiaState stateData={stateData} />
            </div>

        </div>



    )
}

export default Chart
