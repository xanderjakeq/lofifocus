import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ChevronLeft, Plus, X } from 'react-feather';

import { updateUser, getTrackFile } from '../actions';
import { breakpoint } from '../utils/styleConsts';

const Browser = (props) => {

	const { user, tracks, height } = props;
	const { close, updateUser, getTrackFile } = props;

	const { playlist, username } = user.attrs;

	const [trackType, setTrackType] = useState(0);
	const [trackKeys, setTrackKeys] = useState(Object.keys(tracks.lofiTracks));
	const [url, setUrl] = useState();
	

	const audioRef = useRef(null);

	const indexToType = {
		0: 'lofiTracks',
		1: 'noiseTracks',
	}

	const changeTrackType = (type) => {

		setTrackKeys(Object.keys(tracks[indexToType[type]]))
		setTrackType(type);

	}

	const handleFile = (res) => {
        setUrl(res)
        const audio = audioRef.current;
        const isPaused = audio.paused;
        audio.pause();
        audio.load();
        if (!isPaused) {
            audioRef.current.play();
        }
    }

	const selectTrack = (trackKey) => {
		const type = indexToType[trackType];
		const trackName = tracks[indexToType[trackType]][trackKey].url.split("/")[7].split('?')[0].replace("%2F", "/");
		getTrackFile(type, trackName).then(handleFile);
	}

	const addTrackToPlaylist = (e, trackKey) => {
		e.preventDefault();
		e.stopPropagation();

		updateUser(user, {
			playlist: {
				...playlist, 
				[trackKey]: tracks[indexToType[trackType]][trackKey]
			}
		});

	}

	const removeTrackFromPlaylist = (e, trackKey) => {
		e.preventDefault();
		e.stopPropagation();

		const updatedPlaylist = playlist;
		delete updatedPlaylist[trackKey];

		updateUser(user, {
			playlist: updatedPlaylist
		});

	}

	return ( username ?
		<BrowserWrapper height = {height}>
			
			<div id = "container">

				<BackButton onClick = {close}>
					<ChevronLeft size = {20}/>
				</BackButton>

				<div id = "sub-container">

					<h1>Browse Lofi Music</h1>

					<p>
						Add tracks you like to your playlist.
					</p>

					<audio ref = {audioRef} autoPlay controlsList = "nodownload">
						<source src = { url } type="audio/mpeg"/>
					</audio>

					<ul id = "tracks-list">
						{ trackKeys.map( (trackKey, idx) => {
							return (
								<li key = { trackKey } onClick = {() => selectTrack(trackKey)} className = "track">
									{tracks[indexToType[trackType]][trackKey].title}

									{
										trackKey in playlist ? 
										<X onClick = {(e) => removeTrackFromPlaylist(e, trackKey)} size = {20} color = "#e83515" title = "add to playlist"/> 
										: 
										<Plus onClick = {(e) => addTrackToPlaylist(e, trackKey)} size = {20} color = "#1cd95e" title = "add to playlist"/>
									}
								</li>
							)
						})}
					</ul>
					
				</div>
			</div>
		</BrowserWrapper>
		:
		<BrowserWrapper height = {height}>
			<div id = "container">

				<BackButton onClick = {close}>
					<ChevronLeft size = {20}/>
				</BackButton>

				<div id = "sub-container">

					<h1>Sign In to use browser</h1>

					<audio ref = {audioRef} autoPlay controlsList = "nodownload">
						<source src = { url } type="audio/mpeg"/>
					</audio>

					<ul id = "tracks-list">
						
					</ul>
					
				</div>
			</div>

		</BrowserWrapper>
	)
}

const mstp = (state) => { 
	return { 
		user: state.auth.User,
		tracks: state.tracks.allTracks,
	}
}

export default connect(mstp, {updateUser, getTrackFile})(Browser);

const BrowserWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	position: absolute;
	top: 0;
	left: 0;

	width: 100%;
	height: ${props => `${props.height}px`};

	background: white;


	p {
		margin: 10px 0;
	}

	ul {
		list-style: inside;
	}

	#tracks-list {
		height: 300px;
		overflow-y: auto;
		padding: 0 5px;
	}

	.track {
		display: flex;
		align-items: center;
		justify-content: space-between;

		background: #f0efed;
		width: 100%;
		margin: 5px 0;
		padding: 5px;

		list-style: none;

		&:hover {
			cursor: pointer;
		}
	}

	#help-image {
		width: 500px;
		margin: 10px 0;
	}

	#container {
		position: relative;
		width: 500px;
		// width: fill-available;

		height: 60%;

		display: flex;
		align-items: center;
		justify-content: center;
	}


    @media only screen and (max-width: ${breakpoint.b}) {
		#help-image {
			width: 100%;
		}

		#container {
			width: 100%;
			height: 100%;
		}

	}

`;

const BackButton = styled.div`
	position: absolute;
	top: 10px;
	left: 10px;
	&:hover { 
		cursor: pointer;
	}
`;