import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricsReducer } from '../Features/Metrics/reducer';
import { reducer as chartsDataReducer } from '../Features/flareTemp/reducer';

export default {
  weather: weatherReducer,
  metrics: metricsReducer,
  chartsData: chartsDataReducer

};
