import React, {Component} from 'react';
import {Scene, Actions} from 'react-native-router-flux';
import HomeScreenContainer from "./features/home-screen/HomeScreenContainer";
import AuthScreenContainer from "./features/auth-screen/AuthScreenContainer";
import SplashScreenContainer from './features/splash-screen/SplashScreenContainer';
import LayoutScreenContainer from './features/layout-screen/LayoutScreenContainer';
import CreateEditMemoryContainer from './features/create-edit-memory/CreateEditMemoryContainer';
import MemoryDetailsScreenContainer from './features/memory-details-screen/MemoryDetailsScreenContainer';
import FavoriteScreenContainer from './features/favorites-screen/FavoriteScreenContainer';
import ProfileScreenContainer from './features/profile-screen/ProfileScreenContainer';
import EditProfileContainer from './features/profile-screen/EditProfileContainer';

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="splashScreen" component={SplashScreenContainer} hideNavBar={true} initial={true}/>
        <Scene key="authScreen" component={AuthScreenContainer} title="Auth" hideNavBar={true}/>
        <Scene key="layoutScreen" component={LayoutScreenContainer} title="Layout" hideNavBar={true}/>
        <Scene key="homeScreen" component={HomeScreenContainer} title="Home" hideNavBar={true}/>
        <Scene key="createMemory" component={CreateEditMemoryContainer} hideNavBar={true}/>
        <Scene key="memoryDetails" component={MemoryDetailsScreenContainer} hideNavBar={true}/>
        <Scene key="favoritesScreen" component={FavoriteScreenContainer} hideNavBar={true}/>
        <Scene key="profileScreen" component={ProfileScreenContainer} hideNavBar={true}/>
        <Scene key="editProfile" component={EditProfileContainer} hideNavBar={true}/>
    </Scene>
);

export default scenes;