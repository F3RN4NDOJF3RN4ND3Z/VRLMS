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
