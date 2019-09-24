import React,{AppRegistry} from 'react';
import firebaseapp from '../../firebaseConfig';
import {
  Text,
  View,
  VrButton,
  Environment,
  Image,
  asset,
  Model,
  AmbientLight,
  Animated,
  StyleSheet,
} from 'react-360';

import Entity from 'Entity';
const AnimatedEntity = Animated.createAnimatedComponent(Entity);


/*const config = {
  apiKey: "AIzaSyBpKrO8P5ykdOk6dI_jT6xPaKIIiF2dtPo",
  authDomain: "govrlms.firebaseapp.com",
  databaseURL: "https://govrlms.firebaseio.com",
  projectId: "govrlms",
  storageBucket: "govrlms.appspot.com",
  messagingSenderId: "892188446862",
  appId: "1:892188446862:web:549003380652f814"
};
firebase.initializeApp(config);*/


export default class InteractiveObject extends React.Component{

    props: {
      modelUrl:String,
      canRotate:Boolean,
      modelPath:String,
    };
    constructor(props){
      super(props);
      this.state = {
        yRotation: 0, 
      };
      this.lastUpdate = Date.now();
      this.rotate = this.rotate.bind(this);
    }
    
    loadModelUrl(){
      console.log(this.props.modelPath);
      var modelRef=firebaseapp.storage().ref(this.props.modelPath);
      
      modelRef.getDownloadURL().then(function(url) {
        console.log(url);
        this.props.modelUrl=url;
      }).catch(function(error) {
      
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            console.log("File not exist");
            break;
      
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            console.log("No permissions");
            break;
      
          case 'storage/canceled':
            // User canceled the upload
            console.log("Canceled upload");
            break;
      
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            console.log("Unkkow error");
      
            break;
        }
      });
      console.log(this.props.modelUrl);
    }
    rotate() { //custom function, called when it is time to rotate
          const now = Date.now();
          const delta = now - this.lastUpdate;
          const planetSpeed = 20;
          this.lastUpdate = now;
          this.setState({yRotation: this.state.yRotation + delta / planetSpeed});
          //requestAnimationFrame calls the routine specified, not a variable
          this.frameHandle = requestAnimationFrame(this.rotate);
      }
      componentWillUnmount() { //Important clean up functions
          if (this.frameHandle) {
            cancelAnimationFrame(this.frameHandle);
            this.frameHandle = null;
          }
      }

    componentDidMount(){
     this.loadModelUrl();
     console.log(this.props);
     if(this.props.canRotate){
      this.rotate();
     }
    }
    render(){
      if(this.props.modelUrl == null){
        return(
        <View >
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{textAlign: 'center'}}>Loading Model...</Text>
          </View>
        </View>
        );
      }else{
        return (
          
          <View>
            <AmbientLight
                intensity={.5}
              />
            <AnimatedEntity
              style={{transform: [{rotateY: this.state.yRotation}]}}
              //source={{gltf2: asset(this.props.modelUrl)}}
              source={{gltf2: this.props.modelUrl}}
            />
          </View>
        );
      }
        
        
    }

};

const styles = StyleSheet.create({
  wrapper: {
    width: 10,
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderColor: '#303050',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 10,
  },
  name: {
    fontSize: 30,
    textAlign: 'center',
  },
  author: {
    fontSize: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
  },
});
