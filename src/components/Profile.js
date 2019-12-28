import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {  Session  } from './index';
import { handleSignIn, handleSignOut, updateUser, getSessions } from '../actions';
import { breakpoint } from '../utils/styleConsts';
import { AVATAR_FALLBACK_IMG } from '../utils/constants';

const Profile = (props) => {

	const { user, userSession, sessions, hasMore } = props;

	const { handleSignIn, handleSignOut, getSessions, updateUser } = props;

	let { username, averageSession, other } = user.attrs; 

	if ( !other ) {
		other = {
			avatarUrl: AVATAR_FALLBACK_IMG
		}
	}

	const [scrollParentRef, setScrollParentRef] = useState(null);

	useEffect(() => {
		if (username) {
			getSessions(sessions.length, 20);
		}
	},[username]);

	const loadMore = () => { 
		getSessions(sessions.length, 20);
	}

	return username ? (
		<ProfileWrapper  ref={(ref) => setScrollParentRef(ref)}>
			<div id = "profile-wrapper">
				<button
					onClick={ (e) => handleSignOut(e, userSession)}
					className = "signout-button"
				>
					sign out
				</button>
				<h2>Sessions</h2>
				<p>
					Avarage Duration: {averageSession}
				</p>

				<div id = "sessions">
					<InfiniteScroll
						pageStart = {0}
						loadMore = {loadMore}
						hasMore = {hasMore}
						loader = {<div className="loader" key={0}>Loading ...</div>}
						useWindow={false}
						getScrollParent={() => scrollParentRef}
					>
						{
							sessions.map(session => <Session key = {session._id} session={session}/>)
						}
					</InfiniteScroll>
				</div>
				
			</div>
		</ProfileWrapper> 
	)
	:
	<ProfileWrapper>
		<button
			onClick={ (e) => handleSignIn(e, userSession)}
			className = "signin-button"
		>
			Sign In with Blockstack
		</button>
		<p>
			Sign in to log your sessions and save your preferences.
		</p>
	</ProfileWrapper>
}

const mstp = state => {
	return {
		userSession: state.auth.userSession,
		user: state.auth.User,
		sessions: state.sessions.allSessions,
		hasMore: state.sessions.hasMore
	}
}

export default connect(mstp, {handleSignIn, handleSignOut, getSessions, updateUser })(Profile);

const ProfileWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 300px;
	height: 100vh;

	background: #f0efed;

	#profile-wrapper {
		display: flex;
		flex-direction: column;
		
		width: 100%;
		height: 100%;

		align-items: center;

	}

	#sessions {
		height: 100%;
		width: 100%;
		overflow: auto;
	}

	.signin-button {
		font-size: 15px;
		padding: 10px;
		background: #29356d;
		border: none;
		color: white;

		transition-duration: .5s;
		border-radius: 5px;

		&:hover {
		cursor: pointer;
		background: #409eff;
		}
	}
	
	.signout-button {
		align-self: flex-end;
		margin: 10px;

		background: none;
        outline: none;
        border: none;

        font-family: inherit;

        color: black;
        &:hover{
            cursor: pointer;
            color: grey;
        }
	}

	p {
		margin: 10px;
	}
`;