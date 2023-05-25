import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import Employee from './Employee';

export default history =>
    combineReducers({
        router: connectRouter(history),
        USER:Employee
     });