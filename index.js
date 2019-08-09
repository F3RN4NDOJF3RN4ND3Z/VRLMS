import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
} from 'react-360';



export default class VRLMS extends React.Component {
  question = {
    query: 'Esta es una pregunta?',
    answer: '',
  };

  // This method increments our count, triggering a re-render
  changeStyle(option){
    console.log(option);
    this.question.answer=option;
    this.setState(this.question);
  }

// Once the component mounts, run the increment method every second
componentDidMount() {
  //setInterval(this._incrementCount, 1000);
}

  render() {
    return (
      <View style={styles.panel}>
        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>
            {`Pregunta : ${this.question.query}`}
          </Text>
          <Text style={styles.greeting}>
            {`Respuesta : ${this.question.answer}`}
          </Text>
          <VrButton
            onClick={this.changeStyle.bind(this,'A')}
            style={styles.greetingBox} value={'A'}>
            <Text style={styles.greeting}>
              A
            </Text>
           </VrButton>
           <VrButton
            onClick={this.changeStyle.bind(this,'B')}
            style={styles.greetingBox}>
            <Text style={styles.greeting}>
             B
            </Text>
           </VrButton>
           <VrButton
            onClick={this.changeStyle.bind(this,'C')}
            style={styles.greetingBox}>
            <Text style={styles.greeting}>
              C
            </Text>
           </VrButton>
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
});

AppRegistry.registerComponent('VRLMS', () => VRLMS);
