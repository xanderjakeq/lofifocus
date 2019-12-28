import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Session = (props) => {

	const { date, duration } = props.session.attrs;

	return (
		<SessionWrapper>
			<h5>{moment(date).format('MM-DD-YYYY')}</h5>
			<p>{duration} min</p>
		</SessionWrapper>
	)
}

export default Session;

const SessionWrapper = styled.div`
	margin: 20px;
	p {
		margin: 5px 0;
	}
`;