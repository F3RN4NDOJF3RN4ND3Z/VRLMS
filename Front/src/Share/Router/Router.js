import React from 'react';
import Course from "../../Containers/CourseList/Course/Course";


const routerList = [
    {
        key: 1,
        path: "/course/:type",
        exact: true,
        component: Course

    },
    {
        key: 2,
        path: "/:type",
        exact: true,
        component: Course

    }
]



export default routerList
