import React, { useState } from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'react-feather';

import { SelectTrack } from './index';
import { breakpoint } from '../utils/styleConsts';

const Player = (props) => { 

    const [selectedTrack, setSelectedTrack] = useState(0);
    const [isSelecting, setIsSelecting] = useState(false);

	const { name, elRef, tracks = {}, min, max, volume, step, loop } = props;
    const { handleVolume } = props;
    
    const trackKeys = Object.keys(tracks);

    const selectTrack = (idx) => {
        setSelectedTrack(idx);
        setIsSelecting(false);

        const audio = elRef.current;
        const isPaused = audio.paused;
        audio.pause();
        audio.load();
        if (!isPaused) {
            elRef.current.play();
        }
    }
    
	return (
		<PlayerWrapper>
			<audio ref = {elRef} loop = {loop} >
				<source src = { tracks[trackKeys[selectedTrack]].url } type="audio/mpeg"/>
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

export default Player;

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