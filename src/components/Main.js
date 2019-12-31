import React, { useState } from 'react';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { LofiFocus, FakeLink, Profile } from './index';
import { breakpoint } from '../utils/styleConsts';
import help from '../imgs/lofifocus-help.png';

const Main = (props) => {

    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const [isHelpVisible, setIsHelpVisible] = useState(false);

    const toggleProfile = (e) => { 
        e.preventDefault();
        setIsProfileVisible(!isProfileVisible);
    }

    const toggleHelp = (e) => {
        e.preventDefault();
        setIsHelpVisible(!isHelpVisible);
    }

    const viewHieght = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    return (
        <Router>
            <MainWrapper height = {viewHieght}>
                <div id = "main">
                
                    <LofiFocus/>
                    
                    <nav id = "nav">
                        <FakeLink text = "profile" onClick = {toggleProfile} />
                        <FakeLink text = "help" onClick = {toggleHelp} />
                    </nav>
                    {
                        isHelpVisible ?
                        <img src = {help} alt = "Help" id = "help-image"/>
                        :
                        null
                    }

                </div>
                    
                {
                    isProfileVisible ?
                    <Profile close = {toggleProfile}/>
                    :
                    null
                }
            </MainWrapper>
        </Router>
    )
}

export default withRouter(Main);

const MainWrapper = styled.div`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    display: flex;
    align-items: center;
    justify-content: center;

    height: ${props => `${props.height}px`};
    
    font-family: 'Work Sans', sans-serif;

    a {
        color: black;
        &:hover{
            color: grey;
        }
    }

    #nav {
        margin-left: 70px;
    }

    #main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;

        #help-image {
            position: absolute;
            top: auto;
            right: 100%;
            width: 500px;
        }
    }


    #aside {
        position: absolute;
        right: 0;
    }


    @media only screen and (max-width: ${breakpoint.a}) {
        #main {
            
            #help-image {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
            }
        }

    }
`;