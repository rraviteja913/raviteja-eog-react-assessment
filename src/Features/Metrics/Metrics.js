import React, { useEffect } from 'react';
import { Provider, createClient, useQuery} from "urql";
import Select from 'react-select'
import { makeStyles } from '@material-ui/core/styles';
import { actions } from './reducer'
import { useDispatch, useSelector } from 'react-redux';
import FlareTemp from '../flareTemp/FlareTemp.tsx'

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

const callFlareTemp = (arr) => { 
  console.log(arr)
  return <FlareTemp ></FlareTemp>}


const Metrics = (props) => {
  const classes = useStyles()
  const [result] = useQuery({query})
  const { fetching, data, error } = result;
  const dispatch = useDispatch();
  const onSelectionChange = (params) => {
    let arr =[]
    params.forEach(metric => arr.push(metric.value))
    dispatch(actions.metricsDataRecevied({getMetrics: arr}))
    callFlareTemp(arr)
  }
  
  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
  }, [dispatch, data, error])
  const metrics = []
  if( fetching || !data || error ) return <Select options={[]}></Select>

  data.getMetrics.forEach( x => {
    metrics.push({value: x, label: x})
  })

  return <Select className={classes.dropdown} 
  options={metrics} 
  isMulti 
  onChange = {onSelectionChange}></Select>
}

export default (props) => {
  return (
    <Provider value={client}>
      <Metrics {...props}/>
    </Provider>
  );
};
