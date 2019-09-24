import React from 'react';
import {
  Text,
  View,
  VrButton,
  Environment,
  Image,
  asset,
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

export default class InteractiveVideo extends React.Component {
    props: {
        videoUrl: string,
        videoFormat: any
      };

    componentDidMount() {
        VideoModule.createPlayer(VIDEO_PLAYER);
    
        VideoModule.play(VIDEO_PLAYER, {
            source: {url: this.props.videoUrl},
            stereo: this.props.videoFormat,
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
    
    
    playPause(status){
        console.log(status);
        if(status=='playing'){
          VideoModule.pause(VIDEO_PLAYER);
        }else{
          VideoModule.resume(VIDEO_PLAYER);
        }
        
    }

    render(){
        return (
            <View style={styles.videoplayercontrols}>
                <VrButton onClick={playPause(mPlayer.status)}>
                    <Image source={mPlayer.status==='playing' ? asset('pause.png'):asset('play.png')}  style={styles.videoplayerbutton}></Image>
                </VrButton>
                <VideoSliderBar style={{width:600,height:40}} fillColor='#639dda' progress={mPlayer.current_time} duration={mPlayer.duration}></VideoSliderBar>
                <Text>{this.mPlayer.time_current}-{this.mPlayer.time_duration}</Text>
            </View>
        );
    }
        

}