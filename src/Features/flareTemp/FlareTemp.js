import React from 'react';
import { Provider, createClient, useQuery} from "urql";
import { useSelector } from 'react-redux';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

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

const getMetrics = state => {
  const { getMetrics } = state.metrics;
  return getMetrics;
}

const FlareTemp = () => {
  const [result] = useQuery({query, variables: MeasurementQuery})
  const { fetching, data, error } = result;
  const metrics = useSelector(getMetrics)
  console.log(metrics)
  if( fetching || !data || error ) return <div>Empty</div>
    console.log(data)

  return <div>Hello</div>
}

export default (props) => {
  return (
    <Provider value={client}>
      <FlareTemp />
    </Provider>
  );
};
