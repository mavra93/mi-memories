import React, {Component} from 'react';
import {Scene, Actions} from 'react-native-router-flux';
import HomeScreenContainer from "./features/home-screen/HomeScreenContainer";
import AuthScreenContainer from "./features/auth-screen/AuthScreenContainer";
import SplashScreenContainer from './features/splash-screen/SplashScreenContainer';
import LayoutScreenContainer from './features/layout-screen/LayoutScreenContainer';
import CreateEditMemoryContainer from './features/create-edit-memory/CreateEditMemoryContainer';
import MemoryDetailsScreenContainer from './features/memory-details-screen/MemoryDetailsScreenContainer';

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="splashScreen" component={SplashScreenContainer} hideNavBar={true}/>
        <Scene key="authScreen" component={AuthScreenContainer} title="Auth" hideNavBar={true}/>
        <Scene key="layoutScreen" component={LayoutScreenContainer} title="Layout" hideNavBar={true}  initial={true}/>
        <Scene key="homeScreen" component={HomeScreenContainer} title="Home" hideNavBar={true}/>
        <Scene key="createMemory" component={CreateEditMemoryContainer} hideNavBar={true}/>
        <Scene key="memoryDetails" component={MemoryDetailsScreenContainer} hideNavBar={true}/>
    </Scene>
);

export default scenes;