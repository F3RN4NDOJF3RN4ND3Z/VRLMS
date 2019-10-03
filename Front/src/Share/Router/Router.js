import React from 'react';
import Course from "../../Containers/CourseList/Course/Course";
import Login from  "../../Containers/Login/Login";
import Home from  "../../Containers/Home/Home";
import CourseList from  "../../Containers/CourseList/CourseList/CourseList";


const routerList = [
    {
        key: 1,
        path: "/course/:type",
        exact: true,
        component: Course

    },

    {
        key: 3,
        path: "/login",
        exact: true,
        component: Login

    },
    {
        key: 4,
        path: "/home",
        exact: true,
        component: Home

    },
    {
        key: 5,
        path: "/courses",
        exact: true,
        component: CourseList

    },
    {
        key: 6,
        path: "/",
        exact: true,
        component: Home

    },
]



export default routerList
