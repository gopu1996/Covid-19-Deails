import React from 'react'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import CountUp from 'react-countup'
//import cx  from 'classnames'
import style from './IndiaState.module.css'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';



function IndiaState({ stateData }) {

    const useStyles = makeStyles((theme) => ({
        root: {
            margin: 0,
        },
        paper: {
            padding: 0,
            borderTop: "6px double rgba(0, 0,255, 0.5)",
            borderBottom: "10px solid rgba(255,0,0, 0.5)",
            width: "105%",
            height: "85%"
        },
    }));
    const FormRow = () => {
        return (
            stateData.map((value, i) => (

                <Grid item xs={12} key={i} md={3} >
                    <Paper className={classes.paper} component={Card} >
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                {value.state}
                            </Typography>
                            <Typography variant="h6" >
                                Active : <CountUp start={0} end={parseInt(value.active)} duration={2.5} separator="," />
                            </Typography>
                            <Typography variant="h6" >
                                Confirmed : <CountUp start={0} end={parseInt(value.confirmed)} duration={2.5} separator="," />
                            </Typography>
                            <Typography variant="h6" >
                                Recovered :  <CountUp start={0} end={parseInt(value.recovered)} duration={2.5} separator="," />
                            </Typography>
                            <Typography variant="h6" >
                                Death :  <CountUp start={0} end={parseInt(value.deaths)} duration={2.5} separator="," />
                            </Typography>
                            <Typography color="textSecondary">
                                {value.lastUpdate}
                            </Typography>
                        </CardContent>
                    </Paper>
                </Grid>
            ), [])
        );
    }

    const classes = useStyles();

    return (
        <div className={style.container}>
            <h1 style={{ textAlign: "center" }}>Detail Of Covid In India According To State</h1>
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid container item xs={12} spacing={2} >
                        <FormRow />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default IndiaState
