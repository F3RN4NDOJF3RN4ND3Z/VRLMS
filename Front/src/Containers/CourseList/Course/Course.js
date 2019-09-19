import React, {Component} from 'react';
import './Course.css'


class Course extends Component {
    render() {
        const { match: { params: {id : courseId}}} = this.props
        return (<div className="container">
            <h1>Explore the universe</h1>
            <h2>{courseId}</h2>
            <iframe src={"http://localhost:8081/index.html?type=" + courseId} frameBorder="0" />
            <section>
                <p>content</p>
            </section>
        </div>)
    }
}

export default Course;
