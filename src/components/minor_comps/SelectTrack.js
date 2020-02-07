import React from 'react';
import styled from 'styled-components';

const SelectTrack = (props) => { 

	const { tracks, trackKeys } = props;
	const { selectTrack } = props;

	return ( 
		<SelectTrackWrapper> 
			{
				trackKeys.map((track, idx) => {
					return (
						<div key = { idx } onClick = {() => selectTrack(idx)} className = "track">
						{tracks[track].title}
						</div>
					)

				})
			}
		</SelectTrackWrapper>
	)
}

export default SelectTrack;

const SelectTrackWrapper = styled.div`
	position: absolute;

	top: 15px;
	left: -25px;

	background: #f0efed;
	padding: 5px;
	border-radius: 5px;
	z-index: 10;

	max-height: 200px;
    overflow-y: auto;

	.track {
		width: max-content;
		margin: 5px 0;
		&:hover {
			cursor: pointer;
		}
	}
`;