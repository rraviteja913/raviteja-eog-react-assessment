import React, { useEffect, useState } from 'react';
import { Provider, createClient, useQuery} from "urql";
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer'
import LinearProgress from '@material-ui/core/LinearProgress';
import { IState } from '../../store';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

// const MeasurementQuery = {
//   input: []
// }

// const prepareMeasurements = (arr) => {
//     let input = []
//     arr.forEach(metric => {
//       input.push({metricName: metric, after: new Date().getTime() - 30*60*1000})
//     })
//     MeasurementQuery.input = input
// }

const MeasurementQuery = {input : [{metricName: "flareTemp", after: new Date().getTime() - 30*60*1000}]}
const query = `
query ($input: [MeasurementQuery])
 {
    getMultipleMeasurements(input: $input) {
        metric    
        measurements {
          at
          value
          metric
          unit 
        }   
    } 
}
`;

const getMetrics = (state: IState) => {
  const { getMetrics } = state.metrics;
  console.log(getMetrics)
  return getMetrics;
}

export default () => {
  return (
    <Provider value={client} >
      <FlareTemp />
    </Provider>
  );
};

const FlareTemp = () => {
  const dispatch = useDispatch();
  const metric = useSelector(getMetrics)

  const [result] = useQuery({query, variables: MeasurementQuery})
  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(actions.chartsDataApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;

    const { getMultipleMeasurements  } = data
    dispatch(actions.chartsDataRecevied(getMultipleMeasurements))
    
  }, [dispatch, data, error])

  if (fetching) return <LinearProgress />;

  return null
}

