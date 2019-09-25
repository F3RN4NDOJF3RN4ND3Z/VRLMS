import React from 'react';
import Course from "../../Containers/CourseList/Course/Course";


const routerList = [
    {
        key: 1,
        path: "/course/:id",
        exact: true,
        component: Course

    }
]



export default routerList
