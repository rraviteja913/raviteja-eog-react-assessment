import React from 'react';
import { Provider, createClient, useQuery} from "urql";
import Select from 'react-select'
import { makeStyles } from '@material-ui/core/styles';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});
const query = `
query { 
  getMetrics 
}`;


const useStyles = makeStyles({
  dropdown: {
    width: '300px',
    color: 'black'
  },
})

const Metrics = () => {
  const classes = useStyles()
  const [result] = useQuery({query})
  const { fetching, data, error } = result;

  if( fetching || !data || error ) return <Select options={[]}></Select>
  const metrics = []

  data.getMetrics.forEach( x => {
    metrics.push({value: x, label: x})
  })

  return <Select className={classes.dropdown} options={metrics} isMulti></Select>
}

export default () => {
  return (
    <Provider value={client}>
      <Metrics />
    </Provider>
  );
};
