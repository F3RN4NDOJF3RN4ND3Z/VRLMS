import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  Environment,
  Image,
  asset,
  Video,
  VideoControl,
  MediaPlayerState,
  Surface
} from 'react-360';

import VideoModule from 'VideoModule';
const VIDEO_PLAYER = 'myplayer';

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

export default class VRLMS extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playerState: new MediaPlayerState({autoPlay: true, muted: true}), // init with muted, autoPlay
    };
  }

  index = 0;
  mPlayer={status:'none',current_time:0,duration:0,seekTo:0,time_duration:'00:00:00',time_current:'00:00:00'};
  options=['A','B','C'];
  question={
      query: '',
      answer: '',
      options: [],
      imageUrl: ''
  }
  questions = [
    {
      query: 'Cuanto es 2 + 1 ?',
      answer: 'C',
      options: [1,4,3],
      imageUrl: 'https://res.cloudinary.com/helnzir6y/image/upload/v1565747484/3D-6K.jpg',
      imageFormat: '3DBT'
    },
    {
      query: 'Cuanto es 1 + 1 ?',
      answer: 'B',
      options: [1,2,0],
      imageUrl: 'https://res.cloudinary.com/helnzir6y/image/upload/v1548269247/h4b99yn1mmiftba2agdh.jpg',
      imageFormat: '2D'
    },
    {
      query: 'Cuanto es 1 + 0 ?',
      answer: 'A',
      options: [1,2,0],
      imageUrl: 'https://res.cloudinary.com/helnzir6y/image/upload/v1551059795/xv70lvzxxqojxnkllzda.jpg',
      imageFormat: '2D'
    },
    {
      query: 'Cual es el nombre del artista?',
      answer: 'A',
      options: ['Daniel Rojas Roa','Andres Roajas','Camilo Roa Rojas'],
      videoUrl: '/static_assets/video180.mp4',
      videoFormat: '3DLR'
    }
  ];

  changeBackGround(image,imageFormat,video,videoFormat){
    Environment.clearBackground();
   
    if(image != null && imageFormat != null){
      Environment.setBackgroundImage(
        {uri:image},
        {format: imageFormat}, /* one of the formats mentioned above */
      );
    }else if(video != null && videoFormat != null){
      VideoModule.createPlayer(VIDEO_PLAYER);

      VideoModule.play(VIDEO_PLAYER, {
        source: {url: video},
        stereo: videoFormat,
        loop: false,
        muted: false,
        volume: 1,
      });
      this.mPlayer.isPlaying=true;
      player=VideoModule.getPlayer(VIDEO_PLAYER);
      player.addListener('onVideoStatusChanged', (event) => {
        this.mPlayer.duration= event.duration;
        this.mPlayer.current_time=event.position/event.duration;
        this.mPlayer.time_duration= (new Date(this.mPlayer.duration * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
        this.mPlayer.time_current=(new Date(event.position * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
        if (event.status === 'finished') {
          console.log('Video has finished');
          this.mPlayer.status='finished';
          VideoModule.destroyPlayer(VIDEO_PLAYER);
          this.setState(this.mPlayer);
        }
        if (event.isBuffering){
          this.mPlayer.status='buffering';
          console.log('Video is buffering');
        }
        if (event.status === 'playing') {
          this.mPlayer.status='playing';
          this.setState(this.mPlayer);
          console.log('Video is playing');
        }
        if (event.status === 'paused'){
          console.log('Video is paused');
          this.mPlayer.status='paused';
          this.setState(this.mPlayer);
        }
      });
      Environment.setBackgroundVideo('myplayer');
    }
  }
  playPause(status){
    console.log(status);
    if(status=='playing'){
      VideoModule.pause(VIDEO_PLAYER);
    }else{
      VideoModule.resume(VIDEO_PLAYER);
    }
    
  }
  // This method increments our count, triggering a re-render
  changeQuestion(answer){

    if(this.index < this.questions.length){
      if(this.questions[this.index].answer==answer){
        this.index+=1;
      }
    }
    if(this.index >= this.questions.length){
      this.index=0;
      this.mPlayer.status='none';
    }
    console.log(this.index);
    this.question=this.questions[this.index];
    this.setState(this.question);
    this.changeBackGround(this.question.imageUrl,this.question.imageFormat,this.question.videoUrl,this.question.videoFormat);
    
    
  
  }

// Once the component mounts, run the increment method every second
componentDidMount() {
  this.index=0;
  this.question=this.questions[this.index];
  this.setState(this.question);
  this.changeBackGround(this.question.imageUrl,this.question.imageFormat,this.question.videoUrl,this.question.videoFormat);
}

  render() {
    var i=0;
      if(this.question.videoUrl != null && this.mPlayer.status!='finished'){
        return (

     
          <View style={styles.videoplayercontrols}>

          {/*<VideoControl
            style={{
              height: 40,
              width: 900,
            
            }}
          playerState={this.state.playerState}/>*/}
            <VrButton onClick={this.playPause.bind(this,this.mPlayer.status)}>
              <Image source={this.mPlayer.status==='playing' ? asset('pause.png'):asset('play.png')}  style={styles.videoplayerbutton}></Image>
            
            
            </VrButton>
            <VideoSliderBar style={{width:600,height:40}} fillColor='#639dda' progress={this.mPlayer.current_time} duration={this.mPlayer.duration}></VideoSliderBar>
            <Text>{this.mPlayer.time_current}-{this.mPlayer.time_duration}</Text>
            
          </View>
        );
      }
      return (
        < View style = { styles.panel } >
        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>
            {`Pregunta : ${this.question.query}`}
          </Text>
          <Text style={styles.greeting}>
            {`Respuesta : ${this.question.answer}`}
          </Text>
          {

            this.question.options.map((option) => {
              var index = i;
              i++;
              return <VrButton onClick={this.changeQuestion.bind(this, this.options[index])} key={option.uniqueId} style={styles.greetingBox} value={this.options[index]}><Text style={styles.greeting}>{this.options[index]}.{option}</Text></VrButton>
            })
          }
        </View>


          
      </View >
          
 

        
      );
    
  }
};

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

AppRegistry.registerComponent('VRLMS', () => VRLMS);
