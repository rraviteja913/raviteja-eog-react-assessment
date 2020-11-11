import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Metrics = {
    getMetrics: Array<string>;
}

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  getMetrics: Array()
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricsDataRecevied: (state, action: PayloadAction<Metrics>) => {
      const {getMetrics} = action.payload
      state.getMetrics = getMetrics
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
