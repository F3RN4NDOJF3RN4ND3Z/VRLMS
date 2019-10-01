import React,{Component} from 'react';
import './MediaCard.css';
import placeholder from '../../Share/img/placeholderImage512.png';
import { Link } from 'react-router-dom';

export default class MediaCard extends Component {
    

    props:{
        imageUrl:string,
        title:string,
        descriptions:string
    }

  render(){
    return (
        <div className="card">
            <img src={placeholder} alt="Avatar"/>
            <div className="container">
                <h4><b>Explore The Universe</b></h4>
                <p>A tutorial Course Showing all the types of contents</p>
                <Link to="/course/InteractiveOObject"><button>Explore</button></Link>
                
            </div>
           
        </div>

      );


  }
 
}