import React from 'react'
// import axios from 'axios';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div>
            <div className="container">
                <div>
                    <h2>Coding Journal</h2>
                </div>
            <div className="row">
            <div className="col d-flex justify-content-center align-items-center">
                <Link to = {"/tasks"} className='btn btn-xl btn-primary float-end'>View Tasks</Link>
            </div>
            <div className="col d-flex justify-content-center align-items-center">
                <Link to = {"/thoughts"} className='btn btn-xl btn-primary float-end'>View Thoughts</Link>
            </div>
            </div>
            </div>
        </div>
    )
}

export default Home
