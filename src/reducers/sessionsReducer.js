import * as actions from '../actions';

const initialState = { 
	allSessions: [],
	count: 0,
}

const branchTable = { 
	[actions.SESSIONS_RECEIVED]: (state, action) => { 
		let hasMore = true;
		if (action.payload.length === 0) {
			hasMore = false;
		}

		return {
			...state, 
			allSessions: [...state.allSessions, ...action.payload],
			hasMore
		}
	},
	[actions.SESSION_CREATED]: (state, action) => { 
		return { 
			...state,
			allSessions: [action.payload, ...state.allSessions],
			count: state.count + 1
		}
	},
	[actions.SESSIONS_COUNTED]: (state, action) => { 
		return { 
			...state,
			count: action.payload
		}
	},
}

export default (state = initialState, action) => { 
	return action.type in branchTable ? branchTable[action.type](state, action) : state;
}