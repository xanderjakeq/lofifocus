import * as actions from '../actions';

const initialState = { 
	allTracks: null
}

const branchTable = { 
	[actions.TRACKS_RECEIVED]: (state, action) => { 
		return { 
			allTracks: action.payload
		}
	}
}

export default (state = initialState, action) => { 
	return action.type in branchTable ? branchTable[action.type](state, action) : state;
}