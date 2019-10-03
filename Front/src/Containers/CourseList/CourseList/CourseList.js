import React,{Component} from 'react';
import MediaCard from '../../../components/MediaCard/MediaCard';
import { Container } from '@material-ui/core';

import './CourseList.css';

export default class CourseList extends React.Component{

    props:{
        courseList:any
    }

    render(){
        return(
            <Container>
                <h1>Course List</h1>
                <div className="cards">
                    <MediaCard></MediaCard>
                    <MediaCard></MediaCard>
                    <MediaCard></MediaCard>
                    <MediaCard></MediaCard>
                    <MediaCard></MediaCard>
                </div>
      
            </Container>
        );
    }
}