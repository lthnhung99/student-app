import React from 'react'
import Navbar from './Navbar';
import LeftSideBar from './LeftSideBar';
import { Outlet } from 'react-router';

const Index = () => {
return(
    <>
    <Navbar/>
    <div className='container d-flex'>
        <div className='sidebar me-3'>
            <LeftSideBar/>
        </div>
        <div className='content'>
            <Outlet/>
        </div>
    </div>
    </>
)
}
export default Index;