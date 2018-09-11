import React, {Component} from 'react';
import {Scene, Actions} from 'react-native-router-flux';
import HomeScreenContainer from "./features/home-screen/HomeScreenContainer";
import AuthScreenContainer from "./features/auth-screen/AuthScreenContainer";
import SplashScreenContainer from './features/splash-screen/SplashScreenContainer';

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="splashScreen" component={SplashScreenContainer} hideNavBar={true} initial={true} />
        <Scene key="authScreen" component={AuthScreenContainer} title="Auth" hideNavBar={true} />
        <Scene key="homeScreen" component={HomeScreenContainer} title="Home" hideNavBar={true} />
    </Scene>
);

export default scenes;