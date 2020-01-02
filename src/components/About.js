import React  from 'react';
import styled from 'styled-components';
import { ChevronLeft } from 'react-feather';

import { breakpoint } from '../utils/styleConsts';

const About = (props) => {

	const { height } = props;

	const { close } = props;

	return (
		<AboutWrapper height = {height}>
			
			<div id = "container">
				<BackButton onClick = {close}>
					<ChevronLeft size = {20}/>
				</BackButton>
				<div id = "sub-container">

					<h1>LofiFocus.io</h1>

					<p>
						music to get work done
					</p>

					<h2>Features</h2>

					<ul>
						<li>lofi music</li>
						<li>background noise</li>
						<li>save preferences</li>
						<li>log sessions</li>
					</ul>

					<p>
						more tracks soon
					</p>

					<p>
						Made with <span role = "img" aria-label = "tea">☕</span> by <a href = "https://xanderjakeq.page/" target = "_blank" rel = "noopener noreferrer">xanderjakeq</a>
					</p>

				</div>
			</div>
		</AboutWrapper>
	)
}

export default About;

const AboutWrapper = styled.div`
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
		max-width: 300px;
	}

	ul {
		list-style: inside;
	}

	#help-image {
		width: 500px;
		margin: 10px 0;
	}

	#container {
		position: relative;
		width: 500px;

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