import {combineReducers} from 'redux';
import dashboardReducer from './dashboardReducer';
import saleReducer from './saleReducer';

export default combineReducers({
    dashboard:dashboardReducer,
    sale:saleReducer
});