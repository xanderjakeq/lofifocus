import * as actions from '../actions';

const initialState = { 
	allTracks: null,
	currentTracks: {}
}

const branchTable = { 
	[actions.TRACKS_RECEIVED]: (state, action) => { 
		return { 
			...state,
			allTracks: action.payload
		}
	},
	[actions.TRACK_RECEIVED]: (state, action) => { 
		const {type, url} = action.payload;
		return { 
			...state,
			currentTracks: {
				...state.currentTracks,
				[type]: url
			}
		}
	}
}

export default (state = initialState, action) => { 
	return action.type in branchTable ? branchTable[action.type](state, action) : state;
}