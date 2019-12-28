import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { configure, User, getConfig } from 'radiks';
import {
  UserSession,
  AppConfig
} from 'blockstack';

import { Main } from './components';
import { storeUserSession, getCustomUser, handleSignOut } from './actions';

const appConfig = new AppConfig(
  ["store_write", "publish_data"],
);

const userSession = new UserSession({ appConfig: appConfig });

configure({
    apiServer: process.env.REACT_APP_SERVER ? process.env.REACT_APP_SERVER : 'http://localhost:5000',
    userSession
});

const noUsernameMessage = "You need to have a username with your Blockstack ID.\n " + 
                          "You can add a username to your Blockstack ID here: https://browser.blockstack.org/profiles \n\n" + 
                          "Signing Out"; 

const App = (props) => {

    const { handleSignOut } = props;

    const [userData, setUserData] = useState({});

    props.storeUserSession(userSession);

    useEffect (() => {
        const isSigninPending = async (userSession) => {
            let data;
            if (userSession.isSignInPending()) {
                await userSession.handlePendingSignIn().then( async (userData) => {
                    if (userData.username) {
                      window.history.replaceState({}, document.title, "/")
                      setUserData(userData);
                      data = userData;
                    } else {
                      alert(noUsernameMessage);
                      handleSignOut({}, userSession);
                    }
                    
                });
                await User.createWithCurrentUser();
                props.getCustomUser(data)
            } else if (userSession.isUserSignedIn()) {
                data = userSession.loadUserData();
                if (data.username) {
                  setUserData(data);
                  props.getCustomUser(data)
                } else {
                  alert(noUsernameMessage);
                  handleSignOut({}, userSession);
                }
            }
        }
        isSigninPending(userSession);
    }, []);
    return (
        <Main/>
    );
}

const mstp = state => {
    return {
    }
}

export default connect(mstp, {storeUserSession, getCustomUser, handleSignOut})(App);
