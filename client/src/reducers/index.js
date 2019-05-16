import { combineReducers } from 'redux';
import postReducer from './postReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    posts : postReducer,
    errors : errorReducer
});