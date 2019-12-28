import { combineReducers } from 'redux';

import auth from './authReducer';
import tracks from './tracksReducer';
import sessions from './sessionsReducer';

export default combineReducers({
    auth,
    tracks,
    sessions
});
