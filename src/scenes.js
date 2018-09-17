import React, {Component} from 'react';
import {Scene, Actions} from 'react-native-router-flux';
import HomeScreenContainer from "./features/home-screen/HomeScreenContainer";
import AuthScreenContainer from "./features/auth-screen/AuthScreenContainer";
import SplashScreenContainer from './features/splash-screen/SplashScreenContainer';
import LayoutScreenContainer from './features/layout-screen/LayoutScreenContainer';
import CreateMemoryContainer from './features/create-memory/CreateMemoryContainer';

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="splashScreen" component={SplashScreenContainer} hideNavBar={true} initial={true} />
        <Scene key="authScreen" component={AuthScreenContainer} title="Auth" hideNavBar={true} />
        <Scene key="layoutScreen" component={LayoutScreenContainer} title="Layout" hideNavBar={true} />
        <Scene key="homeScreen" component={HomeScreenContainer} title="Home" hideNavBar={true} />
        <Scene key="createMemory" component={CreateMemoryContainer} />
    </Scene>
);

export default scenes;