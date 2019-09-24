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
interactives= [{
    name:'Sun',
    description:'The Sun—the heart of our solar system—is a yellow dwarf star, a hot ball of glowing gases. Its gravity holds the solar system together, keeping everything from the biggest planets to the smallest particles of debris in its orbit. Electric currents in the Sun generate a magnetic field that is carried out through the solar system by the solar wind—a stream of electrically charged gas blowing outward from the Sun in all directions. The connection and interactions between the Sun and Earth drive the seasons, ocean currents, weather, climate, radiation belts and aurorae. Though it is special to us, there are billions of stars like our Sun scattered across the Milky Way galaxy.',
    modelUrl:'/static_assets/Sun.gtlf'
},
{
    name:'Mecury',
    description:'The smallest planet in our solar system and nearest to the Sun, Mercury is only slightly larger than Earth Moon.From the surface of Mercury, the Sun would appear more than three times as large as it does when viewed from Earth, and the sunlight would be as much as seven times brighter. Despite its proximity to the Sun, Mercury is not the hottest planet in our solar system – that title belongs to nearby Venus, thanks to its dense atmosphere.',
    modelUrl:'/static_assets/Mercury.gltf'
},
{
    name:'Venus',
    description:'Second planet from the Sun and our closest planetary neighbor, Venus is similar in structure and size to Earth, but it is now a very different world. Venus spins slowly in the opposite direction most planets do. Its thick atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system—with surface temperatures hot enough to melt lead. Glimpses below the clouds reveal volcanoes and deformed mountains',
    modelUrl:'/static_assets/Venus.gltf'
},
{
    name:'Earth',
    description:'Our home planet is the third planet from the Sun, and the only place we know of so far that’s inhabited by living things. While Earth is only the fifth largest planet in the solar system, it is the only world in our solar system with liquid water on the surface. Just slightly larger than nearby Venus, Earth is the biggest of the four planets closest to the Sun, all of which are made of rock and metal. The name Earth is at least 1,000 years old. All of the planets, except for Earth, were named after Greek and Roman gods and goddesses. However, the name Earth is a Germanic word, which simply means “the ground.”',
    modelUrl:'/static_assets/Earth.gltf'
}]
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
export default class SideMenu extends React.Component{

    props:{
        interactives:any,
        title:String,
        description: String,
    }
    constructor(props){
        super(props);

    }
    changeInteractive=(interactive)=>{
        //interactive;
    }
    render(){
        const {changeInteractive} = this;
        return(
            <View style={styles.greetingBox}>
                <Text  style={styles.greeting}>Menu</Text>
                <Text>Click in the Option.</Text><Text>And get close to the planet</Text>
                {
                    interactives.map((interactive) => {
                        return <VrButton onClick={changeInteractive.bind(this,interactive)} key={interactive.modelUrl} style={styles.greetingBox} value={interactive.modelUrl}><Text style={styles.greeting}>{interactive.name}</Text></VrButton>
                    })
                }
             
            </View>
        );
    }
}