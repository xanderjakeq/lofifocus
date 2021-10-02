import axios from 'axios';

import { isLicenseValid } from '../utils/helpers';

export const GETTING_TRACKS = 'GETTING_TRACKS';
export const TRACKS_RECEIVED = 'TRACKS_RECEIVED';

export const GETTING_TRACK = 'GETTING_TRACK';
export const TRACK_RECEIVED = 'TRACK_RECEIVED';

const api = 'https://us-central1-lofifocus-71c8f.cloudfunctions.net/api';
// const api = 'http://localhost:5001/lofifocus/us-central1/api';

export const getTracks = (license) => async (dispatch) => { 
	dispatch({ 
		type: GETTING_TRACKS
	});

	const isMember = license === "monetized" ? true : await isLicenseValid(license);

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

export const getTrackFile = (type, name) => async (dispatch) => { 
	dispatch({ 
		type: GETTING_TRACK
	});

	// let url = await fetch(`${api}/track/${type}/${name}`)
	let url = await fetch(`${api}/track/${name}`)
	// Retrieve its body as ReadableStream
	.then(response => response.body)
	.then(rs => {
		const reader = rs.getReader();

		return new ReadableStream({
		async start(controller) {
			while (true) {
			const { done, value } = await reader.read();

			// When no more data needs to be consumed, break the reading
			if (done) {
				break;
			}

			// Enqueue the next data chunk into our target stream
			controller.enqueue(value);
			}

			// Close the stream
			controller.close();
			reader.releaseLock();
		}
		})
	})
	// Create a new response out of the stream
	.then(rs => new Response(rs))
	// Create an object URL for the response
	.then(response => response.blob())
	.then(blob => URL.createObjectURL(blob))
	// Update image
	// .then(url => image.src = url)
	.then(url => url)
	.catch(console.error);

	// console.log(URL.createObjectURL(res.data.blob()))

	dispatch({
		type: TRACK_RECEIVED,
		payload: { 
			type,
			url,
		}
	});

	return url;
}
