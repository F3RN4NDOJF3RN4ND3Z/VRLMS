import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  Environment
} from 'react-360';




export default class VRLMS extends React.Component {
  index = 0;
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
    }
  ];

  changeBackGround(image,imageFormat){
    Environment.setBackgroundImage(
      {uri:image},
      {format: imageFormat}, /* one of the formats mentioned above */
    );
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
    this.changeBackGround(this.question.imageUrl, this.question.imageFormat);
    
    
  
  }

// Once the component mounts, run the increment method every second
componentDidMount() {
  this.index=0;
  this.question=this.questions[this.index];
  this.setState(this.question);
  this.changeBackGround(this.question.imageUrl, this.question.imageFormat);
}

  render() {
    var i=0;
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
          {/*<VrButton
            onClick={this.changeQuestion.bind(this,'A')}
            style={styles.greetingBox} value={'A'}>
            <Text style={styles.greeting}>
              A
            </Text>
           </VrButton>
           <VrButton
            onClick={this.changeQuestion.bind(this,'B')}
            style={styles.greetingBox}>
            <Text style={styles.greeting}>
             B
            </Text>
           </VrButton>
           <VrButton
            onClick={this.changeQuestion.bind(this,'C')}
            style={styles.greetingBox}>
            <Text style={styles.greeting}>
              C
            </Text>
          </VrButton>*/}
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
