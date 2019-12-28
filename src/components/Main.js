import React, { useState } from 'react';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { LofiFocus, FakeLink, Profile } from './index';
import { breakpoint } from '../utils/styleConsts';

const Main = (props) => {

    const [isProfileVisible, setIsProfileVisible] = useState(false);

    return (
        <Router>
            <MainWrapper>
                <div id = "main">
                
                    <LofiFocus/>
                    
                    <nav id = "nav">
                        <FakeLink text = "profile" onClick = {() => setIsProfileVisible(!isProfileVisible)} />
                    </nav>

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

    // display: grid;
    // height: 100%;
    // grid-template-areas: "nav main side";
    // grid-template-rows: 1fr;
    // grid-template-columns: .5fr 3fr .5fr;

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

    .DraftEditor-root {
        margin: 10px 0;
        line-height: initial;
	}

    #nav {
        margin-left: 70px;
    }

    #main {
        display: flex;
        flex-direction: column;
        justify-content: center;
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