import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  Environment
} from 'react-360';

import VideoModule from 'VideoModule';
const VIDEO_PLAYER = 'myplayer';

export default class VRLMS extends React.Component {
  index = 0;
  mPlayer={isPlaying:false,time_remaining:0};
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
        
        if (event.status === 'finished') {
          console.log('Video has finished');
          this.mPlayer.isPlaying=false;
          this.setState(this.mPlayer);
        }
        if (event.status === 'playing') {

          console.log('Video is playing');
        }
      });
      Environment.setBackgroundVideo('myplayer');
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
      if(this.mPlayer.isPlaying==true){
        return null;
      }
      return (
     
        <View style={styles.panel}>
          <View style={styles.greetingBox}>
            <Text style={styles.greeting}>
              {`Pregunta : ${this.question.query}`}
            </Text>
            <Text style={styles.greeting}>
              {`Respuesta : ${this.question.answer}`}
            </Text>
            {
               
               this.question.options.map((option) => {
                 var index=i;
                 i++;
                 return <VrButton onClick={this.changeQuestion.bind(this,this.options[index])} key={option.uniqueId} style={styles.greetingBox} value={this.options[index]}><Text style={styles.greeting}>{this.options[index]}.{option}</Text></VrButton>
               })
            }
          </View>
        </View>
        
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
    width: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    transform: [{translate: [2, 2, -5]}],
    borderColor: '#639dda',
    borderWidth: 2,
    backgroundColor: '#000000',
    width: 600,
  },
  videoplayerbutton:{
    backgroundColor: '#c0c0d0',
    borderRadius: 5,
    width: 40,
    height: 44,
  },
});

AppRegistry.registerComponent('VRLMS', () => VRLMS);
