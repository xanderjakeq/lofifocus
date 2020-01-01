import React from 'react';
import styled from 'styled-components';

const FakeLink = (props) => {
	const { text, title, color } = props;
	const { onClick } = props;

	return (
		<FakeLinkWrapper color = {color} onClick = {onClick} title = {title}>
			{text}
		</FakeLinkWrapper>
	)
}

export default FakeLink;

const FakeLinkWrapper = styled.button`
	background: none;
	outline: none;
	border: none;

	margin: 5px 0;
	margin-right: 10px;

	font-family: inherit;
	font-size: 15px;

	color: black;
	&:hover{
		cursor: pointer;
		color: grey;
	}
	color: ${props => props.color}
	
`;