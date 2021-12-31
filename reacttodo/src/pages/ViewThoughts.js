import React, {useState, useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

const ViewThoughts = () => {
    const [thoughts, setThouhts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        axios.get(`api/thoughts`).then(res=> {
            if(res['status']===200) {
                setThouhts(res.data.thoughts);
                setLoading(false);
            }
        })
    }, []); 


    const deleteThoughts = (e,id) => {
        e.preventDefault();
        const delClick = e.currentTarget;
        delClick.innerText = 'deleting..';
        axios.delete(`api/deletetask/${id}`).then(
            res => {
                if(res.data.status === 200){
                    swal('Deleted!', res.data.message);
                    delClick.closest('tr').remove();
                }
                else if(res.data.status === 404) {
                    swal(`error`, res.data.message);
                    delClick.innerText = 'Delete'
                };
            }
        );
    }
    if (loading) {
        return <h4>Loading Thoughts Data</h4>
    }
    else {
        var thoughts_HTMLTABLE="";
        thoughts_HTMLTABLE = thoughts.map((item, index) => {
            return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.thoughts}</td>
                <td>{item.thoughtsdate}</td>
                <td><Link to={`editthoughts/${item.id}`} className='btn btn-success btn-sm'><i class="bi bi-pencil-square"></i></Link></td>
                <td ><button className='btn btn-danger btn-sm'type="button" onClick={(e) => deleteThoughts(e, item.id)}><i class="bi bi-trash"></i></button></td>
            </tr>)
        });
    };
    return (
        <div>
            <div className='container'>
                
                <div className="card">
                    <div className="card-header">
                        <h4>My Thoughts<Link to = {"/addthoughts"} className='btn btn-primary btn-sm float-end'>+ Add Thoughts</Link>
                        </h4>
                        
                    </div>
                    <div className="card-body">
                        <table className='table table-bordered table-responsive'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Thoughts</th>
                                    <th>Date</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody >
                                {thoughts_HTMLTABLE}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ViewThoughts