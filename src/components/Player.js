import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ChevronDown } from 'react-feather';

import { SelectTrack } from './index';
import { getTrackFile } from '../actions';
import { breakpoint } from '../utils/styleConsts';

const Player = (props) => { 
	const { name, elRef, isPlaying, tracks = {}, preferences = {}, min, max, volume, step, loop = false } = props;
    const { handleVolume, handleTrackChange, getTrackFile } = props;

    const [selectedTrack, setSelectedTrack] = useState(preferences[`${name}Selected`] || 0);
    const [isSelecting, setIsSelecting] = useState(false);
    const [url, setUrl] = useState();
    
    const trackKeys = Object.keys(tracks);

    const handleFile = (res) => {
        setUrl(res)
        const audio = elRef.current;
        audio.pause();
        audio.load();
        if (isPlaying) {
            elRef.current.play();
        }
    }

    useEffect (() => {
        const trackType = name;
        const trackName = tracks[trackKeys[selectedTrack]].url.split("/")[7].split('?')[0].replace("%2F", "/");
        getTrackFile(trackType, trackName).then(handleFile)

    }, [selectedTrack]);

    const selectTrack = (idx) => {
        setSelectedTrack(idx);
        setIsSelecting(false);

        handleTrackChange(name, idx);
    }

    const handleEnd = () => {
        if (!loop) {
            if (selectedTrack - 1 < trackKeys.length) {
                const increment = selectedTrack + 1;
                selectTrack(increment)
            } else {
                selectTrack(0)
            }
        }
    }
    
	return (
		<PlayerWrapper>
			<audio ref = {elRef} loop = {loop} onEnded = {handleEnd}>
				<source src = { url } type="audio/mpeg"/>
			</audio>
			<div className = "title">
				{tracks[trackKeys[selectedTrack]].title}
                <div className = "select">
                    <ChevronDown size = {15} onClick={() => setIsSelecting(!isSelecting)} />
                    {
                        isSelecting ?
                        <SelectTrack tracks = {tracks} trackKeys = {trackKeys} selectTrack = {selectTrack}/>
                        :
                        null
                    }
                </div>
			</div>
			<InputRange name = {name} type = "range" min = {min} max = {max} step = {step} value = {volume} onChange = {handleVolume}/>
		</PlayerWrapper>
	)
}

const mstp = (state) => {
    return {

    }
}

export default connect(mstp, {getTrackFile})(Player);

const PlayerWrapper = styled.div`
    margin: 10px 0;

    .title {
        display: flex;
        align-items: center;
        
        .select {
            display: flex;
            position: relative;
            margin: 0 10px;
            svg {
                &:hover {
                    cursor: pointer;
                }

            }
            
        }
    }
`;

const InputRange = styled.input`
& {
    /*removes default webkit styles*/
    -webkit-appearance: none;
    
    /*fix for FF unable to apply focus style bug */
    // border: 1px solid white;
    
    /*required for proper track sizing in FF*/
    width: 300px;

    @media only screen and (max-width: ${breakpoint.b}) {
        width: 100%;
    }
}
&::-webkit-slider-runnable-track {
    width: 300px;
    height: 16px;
    background: #ddd;
    border: none;
    // border-radius: 3px;
    @media only screen and (max-width: ${breakpoint.b}) {
        width: 100%;
    }
}
&::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 16px;
    width: 16px;
    // border-radius: 50%;
    background: #f57607;
    &: hover {
        cursor: pointer;
    }
    // margin-top: -4px;
}
&:focus {
    outline: none;
}
&:focus::-webkit-slider-runnable-track {
    background: #ccc;
}

&::-moz-range-track {
    width: 300px;
    height: 5px;
    background: #ddd;
    border: none;
    // border-radius: 3px;
    @media only screen and (max-width: ${breakpoint.b}) {
        width: 100%;
    }
}
&::-moz-range-thumb {
    border: none;
    height: 16px;
    width: 16px;
    // border-radius: 50%;
    background: goldenrod;
}

/*hide the outline behind the border*/
&:-moz-focusring{
    outline: 1px solid white;
    outline-offset: -1px;
}

&::-ms-track {
    width: 300px;
    height: 5px;
    
    /*remove bg colour from the track, we'll use ms-fill-lower and ms-fill-upper instead */
    background: transparent;
    
    /*leave room for the larger thumb to overflow with a transparent border */
    border-color: transparent;
    border-width: 6px 0;

    /*remove default tick marks*/
    color: transparent;
    @media only screen and (max-width: ${breakpoint.b}) {
        width: 100%;
    }
}
&::-ms-fill-lower {
    background: #777;
    border-radius: 10px;
}
&::-ms-fill-upper {
    background: #ddd;
    border-radius: 10px;
}
&::-ms-thumb {
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: goldenrod;
}
&:focus::-ms-fill-lower {
    background: #888;
}
&:focus::-ms-fill-upper {
    background: #ccc;
}
`;