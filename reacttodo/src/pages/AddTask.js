import React, {useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom'; 

const AddTask = () => {
    const history = useNavigate();
    const [todoInput, setTodo] = useState({
        task: "",
        taskdate: "",
        error_list: [],
        
    });
    const handleInput = (e) => {
        e.persist();
        setTodo({...todoInput, [e.target.name]: e.target.value});
    };
    const saveTask = (e) => {
        e.preventDefault();
        const data = {
            task: todoInput.task,
            taskdate: todoInput.taskdate,
        }
        axios.post(`api/addtask`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "Success");
                setTodo({
                    task: "",
                    taskdate: "",
                    error_list: [],
                });
                history("/tasks")
            }
            else if (res.data.status === 422) {
                setTodo({...todoInput, error_list: res.data.validate})
            }
        })

    };
    return (
        <div>
            <div className='container-fluid'>
            <div className="card push-top">
                <div className="card-header">
                <h4>Add Task
                <Link to = {"/tasks"} className='btn btn-sm btn-primary float-end'>Task List</Link>
                </h4>
                </div>
            <div className="card-body">
                <form onSubmit={saveTask}>
                    <div className='form-group mb-3'>
                        <label htmlFor="task">Task Todo</label>
                        <input className='form-control' type="text" name="task" onChange={handleInput} value={todoInput.task}/>
                        <span className='text-danger'>{todoInput.error_list.task} </span>
                    </div>
                    <div className='form-group mb-3'>
                        <label htmlFor="taskdate">Date</label>
                        <input className='form-control' type="date" name="taskdate" onChange={handleInput} value={todoInput.taskdate}/>
                        <span className='text-danger'>{todoInput.error_list.taskdate} </span>
                    </div>
                    
                    <button className='btn btn-danger float-end'>Submit</button>
                </form>
            </div>
            </div>
            </div>
        </div>
    )
}

export default AddTask
