import * as actions from '../actions';

const initialState = { 
	allSessions: [],
}

const branchTable = { 
	[actions.SESSIONS_RECEIVED]: (state, action) => { 
		let hasMore = true;
		if (action.payload.length === 0) {
			hasMore = false;
		}

		return { 
			allSessions: [...state.allSessions, ...action.payload],
			hasMore
		}
	},
	[actions.SESSION_CREATED]: (state, action) => { 
		return { 
			allSessions: [action.payload, ...state.allSessions]
		}
	},
}

export default (state = initialState, action) => { 
	return action.type in branchTable ? branchTable[action.type](state, action) : state;
}