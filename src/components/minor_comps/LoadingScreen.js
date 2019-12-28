import React from 'react';
import styled from 'styled-components';

const LoadingScreen = (props) => {
	return (
		<LoadingScreenWrapper>
			<h1>
			Loading...
			</h1>
		</LoadingScreenWrapper>
	);
}

export default LoadingScreen;

const LoadingScreenWrapper = styled.div`
	height: 100vh;
	width: 100vw;

	position: fixed;
	top: 0;
	left: 0;

	background: white;

	display: flex;
	align-items: center;
	justify-content: center;

	z-index: 100;

	font-family: 'Work Sans', sans-serif;
`;