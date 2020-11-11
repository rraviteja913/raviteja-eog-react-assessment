import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from './CardHeader';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from './Avatar';
import FlareTemp from '../Features/flareTemp/FlareTemp'

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},
{name: 'Page B', uv: 300, pv: 2400, amt: 2400},
{name: 'Page C', uv: 300, pv: 2400, amt: 2400},
{name: 'Page D', uv: 500, pv: 2400, amt: 2400},
{name: 'Page E', uv: 200, pv: 2400, amt: 2400},
{name: 'Page F', uv: 600, pv: 2400, amt: 2400}];

const renderLineChart = (
    <LineChart width={500} height={700} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );;

const useStyles = makeStyles({
  card: {
    margin: '1%',
  },
});

export default () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader title="Charts" />
      <CardContent>
        {renderLineChart}
      </CardContent>
      <FlareTemp />
    </Card>
  );
};
