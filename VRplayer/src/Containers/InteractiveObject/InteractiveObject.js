import React,{AppRegistry} from 'react';
import firebaseapp from '../../firebaseConfig';
import {connect} from '../../Store';
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





class InteractiveObject extends React.Component{
   
    constructor(props){
      super(props);
      this.state = {
        modelLoaded: false,
        modelUrl:'',
        yRotation: 0,
        modelPath:''
      };
      this.lastUpdate = Date.now();
      this.rotate = this.rotate.bind(this);
    }
    changeModelUrl(url){
      this.setState({modelLoaded:true,modelUrl:url});
      console.log(this.state);
    }
    loadModelUrl(){
      
      this.setState({modelPath:this.props.interactive.modelPath});
      var modelRef=firebaseapp.storage().ref(this.props.interactive.modelPath);
      
      modelRef.getDownloadURL().then((url)=>this.changeModelUrl(url)).catch(function(error) {
      
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

    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.interactive !== this.props.interactive) {
        this.props=nextProps;
        console.log(this.props.interactive.modelPath);

        this.loadModelUrl();
        this.rotate();
      }
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
 
    }
    render(){
   
      if(!this.state.modelLoaded){
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
                intensity={1}
              />
            <AnimatedEntity
              style={{transform: [{rotateY: this.state.yRotation}]}}
              //source={{gltf2: asset(this.props.modelUrl)}}
              source={{gltf2: this.state.modelUrl}}
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

const ConnectedInteractiveObject = connect(InteractiveObject);

export default ConnectedInteractiveObject;