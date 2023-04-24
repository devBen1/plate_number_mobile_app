import { combineReducers } from 'redux';

import userInfoReducers from './userInfo.reducer';

const rootReducer = combineReducers({
    userInfoList: userInfoReducers,

});

export default rootReducer;
