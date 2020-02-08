import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Circle, Play, Pause } from 'react-feather';
import { isEqual, isEmpty } from 'underscore';

import { Player, LoadingScreen, FakeLink } from './index';
import { getTracks, createSession, countSessions, updateUser } from '../actions';
import { breakpoint } from '../utils/styleConsts';

const LofiFocus = (props) => {

	const { tracks, currentTracks, user, sessionCount } = props;

	const { getTracks, createSession, countSessions, updateUser, toggleProfile } = props;

	const { license, username, playlist, averageSession, preferences, signingKeyId } = user.attrs;

	const [startSession, setStartSession] = useState(Date.now());
	const [updatedPreferences, setUpdatedPreferences] = useState(preferences);

	const [isReady, setIsReady] = useState(currentTracks.lofi && currentTracks.noise);
	const [isPlaying, setIsPlaying] = useState(false);
	const [noiseVolume, setNoiseVolume] = useState(updatedPreferences ? updatedPreferences.noiseVolume : .50);
	const [lofiVolume, setLofiVolume] = useState(updatedPreferences ? updatedPreferences.lofiVolume : .50);

	const noiseRef = useRef(null);
	const lofiRef = useRef(null);

	const nameToRef = {
		noise: noiseRef,
		lofi: lofiRef
	}

	useEffect (() => { 
		getTracks(license);
	}, []);

	useEffect (() => {
		setIsReady(currentTracks.lofi && currentTracks.noise);
	}, [currentTracks])

	useEffect(() => { 
		const newPreferences = user.attrs.preferences;
		const { noiseVolume, lofiVolume } = newPreferences || {};
		if (newPreferences) {
			setUpdatedPreferences(newPreferences);
			setNoiseVolume(noiseVolume ? noiseVolume : .5);
			setLofiVolume(lofiVolume ? lofiVolume : .5);
		}
	}, [user]);

	useEffect (() => {
		if (username) {
			countSessions(signingKeyId);
		}
	}, [username]);

	const handleVolume = (e, cb) => { 
		const value = e.target.value;
		const name = e.target.name;
		
		const volume = value;

		cb(value);
		nameToRef[name].current.volume = volume;

		setUpdatedPreferences({
			...updatedPreferences,
			[`${name}Volume`]: volume
		});
	}

	const handleTrackChange = (name, track) => {
		setUpdatedPreferences({
			...updatedPreferences,
			// [`${name}Selected`]: track
			"noiseSelected": track
		});
	}

	const getDuration = () => {
		const durationMillis = Date.now() - startSession;
		const durationMinutes = Math.floor(durationMillis/60000);

		return durationMinutes;
	}

	const average = (sessionDuration, currentAverage, totalSessions) => {
		return ((sessionDuration + totalSessions * currentAverage)/(totalSessions + 1)).toFixed(2);
	}

	const handlePlayPause = (e) => { 
		e.stopPropagation();
		if (!isPlaying) { 
			noiseRef.current.play();
			lofiRef.current.play();

			noiseRef.current.volume = noiseVolume;
			lofiRef.current.volume = lofiVolume;
			
			setStartSession(Date.now());
		} else {
			noiseRef.current.pause();
			lofiRef.current.pause();
			
			if (username) {
				const sessionDuration = getDuration();
				updateUser(user, {
					averageSession: averageSession > 0 ? average(sessionDuration, averageSession, sessionCount) : sessionDuration
				});
				createSession(startSession, getDuration());
			}
		}
		setIsPlaying(!isPlaying);
	}

	const savePreferences = () => {
		updateUser(user, {
			preferences: updatedPreferences
		});
	}

	return tracks ? ( 
		<LofiFocusWrapper> 

			{ isReady ?
			<div onClick = {handlePlayPause} className = "playPauseButton" title = "Listen to original lofi music with some background noise, get work done."> 
				{isPlaying ? 
					<Pause size = {50}/>
					:
					<Play size = {50}/>
				}
			</div>
			:
			<div className = "playPauseButton" title = "Loading tracks."> 
				<Circle size = {50}/>
			</div>

			}
			<div className = "volumeSliders">
				<Player name = "lofi" 
					isPlaying = {isPlaying}
					elRef = {lofiRef} 
					tracks = { isEmpty(playlist) ? tracks.lofiTracks : {...playlist} }
					preferences = {updatedPreferences}
					min = "0"
					max = "1"
					step = ".01"
					volume = { lofiVolume } 
					handleVolume = {e => handleVolume(e, setLofiVolume) }
					handleTrackChange = {handleTrackChange}
				/>
				<Player name = "noise" 
					isPlaying = {isPlaying}
					elRef = {noiseRef} 
					tracks = { tracks.noiseTracks } 
					preferences = {updatedPreferences}
					min = "0"
					max = "1"
					step = ".01"
					volume = { noiseVolume } 
					handleVolume = {e => handleVolume(e, setNoiseVolume) }
					handleTrackChange = {handleTrackChange}
					loop
				/>
				{
					!isEqual(preferences, updatedPreferences) ? 
					<FakeLink text = "save preferences" color = "red" onClick = {username ? savePreferences : toggleProfile} />
					:
					null
				}
			</div>
		</LofiFocusWrapper>
	)
	:
	<LoadingScreen/>
}

const mstp = (state) => { 
	return { 
		user: state.auth.User,
		tracks: state.tracks.allTracks,
		currentTracks: state.tracks.currentTracks,
		sessionCount: state.sessions.count
	}
}

export default connect(mstp, {getTracks, createSession, countSessions, updateUser})(LofiFocus);

const LofiFocusWrapper = styled.div`
	display: flex;
	width: min-content;

	align-items: center;
	justify-content: center;

	.playPauseButton { 
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 10px;

		&:hover { 
			cursor: pointer;
		}
	}

    @media only screen and (max-width: ${breakpoint.b}) {
		width: 100%;
		.volumeSliders {
			width: 200px;
		}
	}
`;