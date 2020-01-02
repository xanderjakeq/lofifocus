import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Play, Pause } from 'react-feather';
import { isEqual } from 'underscore';

import { Player, LoadingScreen, FakeLink } from './index';
import { getTracks, createSession, updateUser } from '../actions';
import { breakpoint } from '../utils/styleConsts';

const LofiFocus = (props) => {

	const { tracks, user } = props;

	const { getTracks, createSession, updateUser } = props;

	const { license, username, averageSession, preferences } = user.attrs;

	const [startSession, setStartSession] = useState(Date.now());
	const [updatedPreferences, setUpdatedPreferences] = useState(preferences);

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

	useEffect(() => { 
		const newPreferences = user.attrs.preferences;
		const { noiseVolume, lofiVolume } = newPreferences || {};
		if (newPreferences) {
			setUpdatedPreferences(newPreferences);
			setNoiseVolume(noiseVolume ? noiseVolume : .5);
			setLofiVolume(lofiVolume ? lofiVolume : .5);
		}
	}, [user]);

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

	const getDuration = () => {
		const durationMillis = Date.now() - startSession;
		const durationMinutes = Math.floor(durationMillis/60000);

		return durationMinutes;
	}

	const handlePlayPause = (e) => { 
		e.stopPropagation();
		if (!isPlaying) { 
			noiseRef.current.play();
			lofiRef.current.play();

			if (updatedPreferences) {
				const { noiseVolume, lofiVolume } = updatedPreferences;
				noiseRef.current.volume = noiseVolume;
				lofiRef.current.volume = lofiVolume;
			}
			
			setStartSession(Date.now());
		} else {
			noiseRef.current.pause();
			lofiRef.current.pause();
			if (username) {
				const sessionDuration = getDuration();
				updateUser(user, {
					averageSession: averageSession > 0 ? ((sessionDuration + averageSession) / 2).toFixed(2) : sessionDuration
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
			<div onClick = {handlePlayPause} className = "playPauseButton" title = "Listen to original lofi music with some background noise, get work done."> 
				{ isPlaying ? 
					<Pause size = {50}/>
					:
					<Play size = {50}/>
				}
			</div>
			<div className = "volumeSliders">
				<Player name = "lofi" 
						elRef = {lofiRef} 
						tracks = { tracks.lofiTracks }
						min = "0"
						max = "1"
						step = ".01"
						volume = { lofiVolume } 
						handleVolume = {e => handleVolume(e, setLofiVolume) }
						loop
				/>
				<Player name = "noise" 
						elRef = {noiseRef} 
						tracks = { tracks.noiseTracks } 
						min = "0"
						max = "1"
						step = ".01"
						volume = { noiseVolume } 
						handleVolume = {e => handleVolume(e, setNoiseVolume) }
						loop
				/>
				{
					!isEqual(preferences, updatedPreferences) && username ? 
					<FakeLink text = "save preferences" color = "red" onClick = {savePreferences} />
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
		tracks: state.tracks.allTracks
	}
}

export default connect(mstp, {getTracks, createSession, updateUser})(LofiFocus);

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