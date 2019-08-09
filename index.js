import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
} from 'react-360';

export default class VRLMS extends React.Component {
  state = {
    count: 0,
  };

  // This method increments our count, triggering a re-render
_incrementCount = () => {
  this.setState({count: this.state.count + 1});
};

// Once the component mounts, run the increment method every second
componentDidMount() {
  //setInterval(this._incrementCount, 1000);
}

  render() {
    return (
      <View style={styles.panel}>
        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>
            {`Welcome LMS VR Powered By 3GOVideo: ${this.state.count}`}
          </Text>
          <VrButton
            onClick={this._incrementCount}
            style={styles.greetingBox}>
            <Text style={styles.greeting}>
              {`Count: ${this.state.count}`}
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
