import InteractiveObject from './src/Containers/InteractiveObject/InteractiveObject';
import SideMenu from './src/Components/SideMenu/SideMenu';
import DetailPanel from './src/Components/DetailPanel/DetailPanel';
import InteractiveVideo from './src/Containers/InteractiveVideo/InteractiveVideo';
import * as Store from './src/Store';

import React from 'react';
import { MemoryRouter as Router, Redirect, Route, Switch } from 'react-router';
import {
    AppRegistry, NativeModules,
    View,
    VrButton,

} from 'react-360';


import CourseVR from "./src/Containers/CourseVR/CourseVR";
import Test from "./src/Containers/Test/Test";


class App extends React.Component {

    render() {
    return (
        <Router>
            <View>
                <Route exact path='/' component={CourseVR}/>
                <Route exact path='/questions' component={CourseVR}/>
                <Route exact path='/click' component={Test}/>
            </View>
        </Router>
    );
  }


}

AppRegistry.registerComponent('VRLMS', () => App);
AppRegistry.registerComponent('App1', () => CourseVR);
AppRegistry.registerComponent('hello_vr', () => Test);
Store.initialize();
AppRegistry.registerComponent('SideMenu', () => SideMenu);
AppRegistry.registerComponent('DetailPanel', () => DetailPanel);
AppRegistry.registerComponent('InteractiveObject', () => InteractiveObject);
AppRegistry.registerComponent('InteractiveVideo', () => InteractiveVideo);
