import React from 'react';
import {
  Text,
  View,
  VrButton,
  Environment,
  Image,
  asset,
 
} from 'react-360';

class InteractiveImage extends React.Component{
    render(){
        return (
            < View style = { styles.panel } >
                <View style={styles.greetingBox}>
                <Text style={styles.greeting}>
                    {`Pregunta : ${this.question.query}`}
                </Text>
                <Text style={styles.greeting}>
                    {`Respuesta : ${this.question.answer}`}
                </Text>
                <VrButton><Text style={styles.greeting}>Boton Interactivo</Text></VrButton>
                </View>
          </View >
        );
    }
}