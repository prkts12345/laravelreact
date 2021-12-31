import React, {useState, useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

const ViewTask = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        axios.get(`api/tasks`).then(res=> {
            if(res['status']===200) {
                setTasks(res.data.tasks);
                setLoading(false);
            }
        })
    }, []); 


    const deleteTask = (e,id) => {
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
        return <h4>Loading Task Data</h4>
    }
    else {
        var task_HTMLTABLE="";
        task_HTMLTABLE = tasks.map((item, index) => {
            return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.task}</td>
                <td>{item.taskdate}</td>
                <td><Link to={`edittask/${item.id}`} className='btn btn-success btn-sm'><i class="bi bi-pencil-square"></i></Link></td>
                <td ><button className='btn btn-danger btn-sm'type="button" onClick={(e) => deleteTask(e, item.id)}><i class="bi bi-trash"></i></button></td>
            </tr>)
        });
    };
    return (
        <div>
            <div className='container'>
                
                <div className="card">
                    <div className="card-header">
                        <h4>TASK TO DO<Link to = {"/addtask"} className='btn btn-primary btn-sm float-end'>+ Add Task</Link>
                        </h4>
                        
                    </div>
                    <div className="card-body">
                        <table className='table table-bordered table-responsive'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Task</th>
                                    <th>Date</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody >
                                {task_HTMLTABLE}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ViewTask