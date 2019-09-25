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
import {connect, setCurrent} from '../../Store';

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
class MenuButton extends React.Component{

    changeInteractive=(interactive)=>{
        //interactive;
        setCurrent(interactive);
    }
    render(){
        const {changeInteractive} = this;
        return(
            <VrButton onClick={changeInteractive.bind(this,this.props.object)} key={this.props.key} style={styles.greetingBox}><Text style={styles.greeting}>{this.props.name}</Text></VrButton>
        );
    }
}

const SideMenu = props => {
    console.log(props);
    if (props.interactives == undefined) {
      return (
        <View style={styles.wrapper}>
          <Text>Loading...</Text>
        </View>
      );
    }
  
    return (
      <View style={styles.wrapper}>
        {props.interactives.map((interactive) => (
          <MenuButton
            key={interactive.name}
            name={interactive.name}
            object={interactive}
          />
        ))}
      </View>
    );
  };

  const ConnectedMenu = connect(SideMenu);

export default ConnectedMenu;