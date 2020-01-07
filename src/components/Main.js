import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { LofiFocus, FakeLink, Profile, About } from './index';
import { breakpoint } from '../utils/styleConsts';
import help from '../imgs/lofifocus-help.png';

const Main = (props) => {

    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const [isHelpVisible, setIsHelpVisible] = useState(false);
    const [isAboutVisible, setIsAboutVisible] = useState(false);

    useEffect(() => { 
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        document.body.appendChild(script);
    },[])

    const toggleProfile = (e) => { 
        e.preventDefault();
        setIsProfileVisible(!isProfileVisible);
    }

    const toggleAbout = (e) => {
        e.preventDefault();
        setIsAboutVisible(!isAboutVisible);
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
                
                    <LofiFocus toggleProfile = {toggleProfile}/>
                    
                    <nav id = "nav">
                        <FakeLink text = "profile" onClick = {toggleProfile} />
                        <FakeLink text = "about" onClick = {toggleAbout} />
                        <FakeLink text = "help" onClick = {toggleHelp} />
                    </nav>
                    <div id = "share-btns">
                    <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-text="Listen to #lofi music and get productive with LofiFocus. " data-related="xanderjakeq,xajemusic" data-show-count="false" alt="tweet">tweet</a>
                    </div>
                    {
                        isHelpVisible ?
                        <img src = {help} alt = "Help" id = "help-image"/>
                        :
                        null
                    }

                </div>

                {
                    isAboutVisible ?
                    <About height = {viewHieght} close = {toggleAbout}/>
                    :
                    null
                }
                    
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

    #share-btns { 
        margin: 10px 0;
        margin-left: 70px;
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