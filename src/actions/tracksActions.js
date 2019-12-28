import axios from 'axios';

import { isLicenseValid } from '../utils/helpers';

export const GETTING_TRACKS = 'GETTING_TRACKS';
export const TRACKS_RECEIVED = 'TRACKS_RECEIVED';

export const getTracks = (license) => async (dispatch) => { 
	dispatch({ 
		type: GETTING_TRACKS
	});

	const isMember = await isLicenseValid(license);

	const api = 'https://us-central1-lofifocus.cloudfunctions.net/api';

	let noiseTracks = await axios.get(`${api}/noisetracks`, {
		params: {
			isMember
		}
	});
	let lofiTracks = await axios.get(`${api}/lofitracks`, {
		params: {
			isMember
		}
	});

	const tracks = {
		noiseTracks: noiseTracks.data || [],
		lofiTracks: lofiTracks.data || []
	}

	dispatch({
		type: TRACKS_RECEIVED,
		payload: tracks
	});
}