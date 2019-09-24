import React from 'react';
import {
  View,
  VrButton,
} from 'react-360';

class VideoSliderBar extends React.Component {
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