import { Session } from '../models';

export const CREATING_SESSION = 'CREATING_SESSION';
export const SESSION_CREATED = 'SESSION_CREATED';

export const GETTING_SESSIONS = 'GETTING_SESSIONS';
export const SESSIONS_RECEIVED = 'SESSIONS_RECEIVED';

export const COUNTING_SESSIONS = 'COUNTING_SESSIONS';
export const SESSIONS_COUNTED = 'SESSIONS_COUNTED';

export const createSession = (date, duration) => async (dispatch) => { 
	dispatch({
		type: CREATING_SESSION
	});

	const newSession = new Session({
		date,
		duration
	});

	const session = await newSession.save();

	dispatch({
		type: SESSION_CREATED,
		payload: session
	});
}

export const getSessions = (offset, limit) => async (dispatch) => { 
	dispatch({
		type: GETTING_SESSIONS
	});

	const sessions = await Session.fetchOwnList({
		offset,
		limit,
		sort: '-createdAt'
	});

	dispatch({ 
		type: SESSIONS_RECEIVED,
		payload: sessions
	});
}

export const countSessions = (signingKeyId) => async (dispatch) => {
	dispatch({
		type: COUNTING_SESSIONS
	});

	const sessionCount = await Session.count({
		signingKeyId
	});

	dispatch({
		type: SESSIONS_COUNTED,
		payload: sessionCount
	});
}