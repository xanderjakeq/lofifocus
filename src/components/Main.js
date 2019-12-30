import React, { useState } from 'react';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { LofiFocus, FakeLink, Profile } from './index';
import { breakpoint } from '../utils/styleConsts';
import help from '../imgs/lofifocus-help.png';

const Main = (props) => {

    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const [isHelpVisible, setIsHelpVisible] = useState(false);

    return (
        <Router>
            <MainWrapper>
                <div id = "main">
                
                    <LofiFocus/>
                    
                    <nav id = "nav">
                        <FakeLink text = "profile" onClick = {() => setIsProfileVisible(!isProfileVisible)} />
                        <FakeLink text = "help" onClick = {() => setIsHelpVisible(!isHelpVisible)} />
                    </nav>
                    {
                        isHelpVisible ?
                        <img src = {help} alt = "Help" id = "help-image"/>
                        :
                        null
                    }

                </div>
                    
                <div id = "aside">
                {
                    isProfileVisible ?
                    <Profile/>
                    :
                    null
                }
                </div>
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

    height: 100vh;
    
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
        display: unset;
        width: 100%;
        #nav {
            // grid-area: none;
            // position: fixed;
            // bottom: 0;
            // z-index: 10;

            // div {
            //     position: fixed;
            //     top: unset;
            //     bottom: 0;
            //     left: 0;

            //     padding: 0;
            //     width: 100%;

            //     flex-direction: row;
            //     justify-content: space-evenly;

            //     background: white;
            //     border-top: 1px solid #d2d6d7;

            //     a {
            //         width: min-content;
            //         span {
            //             display: none;
            //         }
            //     }
            // }

            // .other-links {
            //     display: none;
            // }
        }
        #main {
            // grid-area: none;
            // width: unset;
            // margin-bottom: 50px;
        }
        #aside {
            grid-area: none;
        }
    }
`;