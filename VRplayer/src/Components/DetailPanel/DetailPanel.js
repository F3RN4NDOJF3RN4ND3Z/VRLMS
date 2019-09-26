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
import {connect} from '../../Store';
const styles = StyleSheet.create({
    wrapper: {
      width: 300,
      height: 600,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderColor: '#303050',
      borderWidth: 2,
      flexDirection: 'column',
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
const DetailPanel = props =>{
    if (props.interactive != undefined) {
        return(
            <View style={styles.wrapper}>
                <Text style={styles.name}>{props.interactive.name}</Text>
                <Text style={styles.description}>{props.interactive.description}</Text>
            </View>
        );
    }else{
        return(
            <View style={styles.wrapper}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{textAlign: 'center'}}>Select an option from the left panel</Text>
                </View>
            </View>
        );
    }
    

}

const ConnectedCurrentObject = connect(DetailPanel);

export default ConnectedCurrentObject;