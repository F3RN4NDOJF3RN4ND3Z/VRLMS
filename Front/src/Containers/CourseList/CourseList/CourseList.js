import React,{Component} from 'react';
import MediaCard from '../../../components/MediaCard/MediaCard';

export default class CourseList extends React.Component{

    props:{
        courseList:any
    }

    render(){
        return(
            <div>
                <h1>Course List</h1>
                <MediaCard></MediaCard>
            </div>
        );
    }
}