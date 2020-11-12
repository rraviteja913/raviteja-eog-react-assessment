import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from './CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import LineCharts from './LineCharts'
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  card: {
    margin: '1%',
  },
});

const getMetrics = (state) => {
  const { getMetrics } = state.metrics;
  return getMetrics;
}
const metric = ["flareTemp",
"casingPressure",
"injValveOpen",
"oilTemp",
"tubingPressure",
"waterTemp"]

export default (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.card} >
      <CardContent>
        <LineCharts metric={'flareTemp'}/>        
      </CardContent>
    </Card>
  );
};
