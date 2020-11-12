import React from 'react';
import { Provider, createClient, useQuery} from "urql";
import LinearProgress from '@material-ui/core/LinearProgress';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
})
const metrics = []
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
const MeasurementQuery = {input : [{metricName: 'flareTemp', after: new Date().getTime() - 30*60*1000}]}

const CustomToolTip = ({active, payload, label}) => {
  if (active) {
    return(
      <div className="custom-tooltip">
        <div> {`metric: flareTemp`} </div>
        <div> {`value: ${payload[0].value}`} </div>
    </div>
    );
  };
  return null;
  };

const LineCharts = (props) => {
  const [result] = useQuery({query, variables: MeasurementQuery })
    const { fetching, data, error } = result;
    if (fetching) return <LinearProgress />;
    const {getMultipleMeasurements} = data

    if(!data || data.length == 0) return <div></div>

    return <LineChart width={1000} height={400} data={getMultipleMeasurements[0].measurements} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <CartesianGrid strokeDasharray="4 4" />
        <XAxis />
        <YAxis  type="number" domain={['auto','auto']} />
        <Tooltip content={CustomToolTip}/>
        <Line name={getMultipleMeasurements[0].metric} type="monotone" dataKey='value' stroke="#82ca9d" />
    </LineChart>
};

export default (props) => {
    return (
      <Provider value={client} >
        <LineCharts {...props}/>
      </Provider>
    );
  };