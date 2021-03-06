import React from 'react';
import {
  View,
  VrButton,
  StyleSheet,
} from 'react-360';
import VideoModule from 'VideoModule';
const VIDEO_PLAYER = 'myplayer';

const styles = StyleSheet.create({
  panel: {
      // Fill the entire surface
      width: 1000,
      height: 600,
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      justifyContent: 'center',
      alignItems: 'center',
  },
  greetingBox: {
      padding: 20,
      backgroundColor: '#000000',
      borderColor: '#639dda',
      borderWidth: 2,
  },
  greeting: {
      fontSize: 30,
  },
  videoplayercontrols: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      transform: [{translate: [0,-800,0], rotation: [0,0,0]}],
      borderColor: '#639dda',
      borderWidth: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      width: 1000,
      height:50,
      borderRadius: 5,
      paddingHorizontal: '10%',
  },
  videoplayerbutton:{

      width: 20,
      height: 20,
  },

  text: {
      textAlign: 'center',
      textAlignVertical: 'center',
      paddingHorizontal: '2%',
  },
  timerContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: '2%',
  },
  timerText: {
      paddingLeft: '2%',
      paddingRight: 0,
  },
  progressBar: {
      flex: 1,
  },
  barContainer: {
      paddingLeft: '2%',
      paddingRight: '2%',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
  },
  barFill: {
      height: '30%',
  },
  barEmpty: {
      height: '30%',
      backgroundColor: '#333',
  },
  volumeContainer: {
      flex: 0.3,
      paddingHorizontal: '2%',
      backgroundColor: '#222',
  },
  volumeBar: {
      flex: 1,
  },
  loader: {

      borderRadius: 50,
      width: 120,
      height: 120,
  }
});

export default class VideoSliderBar extends React.Component {
    props: {
      fillColor: string,
      style: any,
      progress: number,
      onClickProgress?: ?(position: number) => any,
      duration: number,
    };
    _gazedPosition: number = -1;
  
    _onExit = () => {
      this._gazedPosition = -1;
    };
  
    _onClick = () => {
      
      this._gazedPosition >= 0 &&
        this.props.onClickProgress &&
        this.props.onClickProgress(this._gazedPosition);
        console.log(this._gazedPosition);
        this.props.progress=this._gazedPosition;
        VideoModule.seek(VIDEO_PLAYER,this._gazedPosition* this.props.duration),
        VideoModule.resume(VIDEO_PLAYER);
    };
  
    _onFillMove = (e: Object) => {
      this._gazedPosition = this.props.progress * e.nativeEvent.offset[0];
    };
  
    _onEmptyMove = (e: Object) => {
      this._gazedPosition = this.props.progress + (1 - this.props.progress) * e.nativeEvent.offset[0];
    };
  
    render() {
      return (
        <VrButton
          style={[this.props.style, styles.barContainer]}
          onExit={this._onExit}
          onClick={this._onClick}>
          <View
            style={[
              styles.barFill,
              {flex: this.props.progress, backgroundColor: this.props.fillColor},
            ]}
            onMove={this._onFillMove}
          />
          <View
            style={[styles.barEmpty, {flex: 1 - this.props.progress}]}
            onMove={this._onEmptyMove}
          />
          
        </VrButton>
       
      );
    }
  
    
  }