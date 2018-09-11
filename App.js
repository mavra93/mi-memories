import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/appStorage';
import MainContainer from './src/MainContainer';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
              <MainContainer/>
            </Provider>
        );
    }
}
