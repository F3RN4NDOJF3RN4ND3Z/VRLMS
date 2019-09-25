import * as React from 'react';

const State = {
    interactives: undefined,
    interactive: undefined,
  };


const listeners = new Set();

function updateComponents() {
  for (const cb of listeners.values()) {
    cb();
  }
}

export function setCurrent(value) {
    State.interactive = value;
    updateComponents();
}

export function initialize() {
  State.interactives=[{
    name:'Sun',
    description:'The Sun—the heart of our solar system—is a yellow dwarf star, a hot ball of glowing gases. Its gravity holds the solar system together, keeping everything from the biggest planets to the smallest particles of debris in its orbit. Electric currents in the Sun generate a magnetic field that is carried out through the solar system by the solar wind—a stream of electrically charged gas blowing outward from the Sun in all directions. The connection and interactions between the Sun and Earth drive the seasons, ocean currents, weather, climate, radiation belts and aurorae. Though it is special to us, there are billions of stars like our Sun scattered across the Milky Way galaxy.',
    modelPath:'Sun.gltf'
  },
  {
      name:'Mecury',
      description:'The smallest planet in our solar system and nearest to the Sun, Mercury is only slightly larger than Earth Moon.From the surface of Mercury, the Sun would appear more than three times as large as it does when viewed from Earth, and the sunlight would be as much as seven times brighter. Despite its proximity to the Sun, Mercury is not the hottest planet in our solar system – that title belongs to nearby Venus, thanks to its dense atmosphere.',
      modelPath:'Mercury.gltf'
  },
  {
      name:'Venus',
      description:'Second planet from the Sun and our closest planetary neighbor, Venus is similar in structure and size to Earth, but it is now a very different world. Venus spins slowly in the opposite direction most planets do. Its thick atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system—with surface temperatures hot enough to melt lead. Glimpses below the clouds reveal volcanoes and deformed mountains',
      modelPath:'Venus.gltf'
  },
  {
      name:'Earth',
      description:'Our home planet is the third planet from the Sun, and the only place we know of so far that’s inhabited by living things. While Earth is only the fifth largest planet in the solar system, it is the only world in our solar system with liquid water on the surface. Just slightly larger than nearby Venus, Earth is the biggest of the four planets closest to the Sun, all of which are made of rock and metal. The name Earth is at least 1,000 years old. All of the planets, except for Earth, were named after Greek and Roman gods and goddesses. However, the name Earth is a Germanic word, which simply means “the ground.”',
      modelPath:'Earth2.gltf'
  }]
  updateComponents();
}


export function connect(Component) {
    return class Wrapper extends React.Component {
      state = {
        interactive: State.interactive,
        interactives: State.interactives
      };
  
      _listener = () => {
        this.setState({
          interactive:State.interactive,
          interactives:State.interactives
        });
      };
  
      componentDidMount() {
        listeners.add(this._listener);
      }
  
      componentWillUnmount() {
        listeners.delete(this._listener);
      }
  
      render() {
        return (
          <Component
            {...this.props}
            interactives={this.state.interactives}
            interactive={this.state.interactive}
          />
        );
      }
    };
}