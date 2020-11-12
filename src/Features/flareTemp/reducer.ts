import { createSlice, PayloadAction } from 'redux-starter-kit';

export type chartsData = {
    getMultipleMeasurements: {
        metric: string,
        measurements: [{
          at: number,
          value: number,
          metric: string,
          unit: string
          }],
    };
}

export type ApiErrorAction = {
  error: string;
};

const initialState = {
    getMultipleMeasurements: {
        metric: '',
        measurements: [ {
          at: 0,
          value: 0,
          metric: '',
          unit: ''
        }]
    }
};

const slice = createSlice({
  name: 'chartsData',
  initialState,
  reducers: {
    chartsDataRecevied: (state, action: PayloadAction<chartsData>) => {
        if(action.payload) {
            console.log(action.payload)
            const { metric, measurements} = action.payload.getMultipleMeasurements
            console.log(metric)
            state.getMultipleMeasurements.metric = metric
            measurements.forEach(value => {
              console.log(value)
            //   state.getMultipleMeasurements.measurements.push({
            //     at: value.at,
            //     value: value.value,
            //     metric: value.metric,
            //     unit: value.unit
            // })
          }) 
        }
    //   const {entries} = action.payload
    //   console.log({entries})
    //   state.data = data
    },
    chartsDataApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
