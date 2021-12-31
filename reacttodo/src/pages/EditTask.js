import React, {useState, useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import {  Link, useNavigate, useParams  } from 'react-router-dom';

const EditTask = () => {
    

    const navigate = useNavigate();
    const [todoInput, setTodo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorInput, setError] = useState([]);
    const {id} = useParams();
    const handleInput = (e) => {
        return setTodo({...todoInput, [e.target.name]: e.target.value});
        
    }
    

    useEffect(() => {
        const task_id = id;
        axios.get(`api/edit/${task_id}`).then(res => {
                if(res.data.status === 200){
                    setTodo(res.data.task);
                    setLoading(false);
                }
                else if(res.data.status === 404) {
                    swal(`error`, res.data.message);
                    navigate('/tasks');
                }
            })
        
    }, [navigate, id]);

    const updateTask = (e) => {
        e.preventDefault();
        const data = {
            task:todoInput.task,
            taskdate:todoInput.taskdate
        }
        axios.put(`api/updatetask/${id}`,data).then(
            res => {
                if(res.data.status === 200){
                    swal('Success!', res.data.message);
                    setError([]);
                    navigate('/tasks');
                }
                else if(res.data.status === 404) {
                    swal(`error`, res.data.message);
                    navigate('/tasks');
                }
                else if(res.data.status === 422) {
                    swal('All fields are mandatory!', '');
                    setError(res.data.validationErrors);
                }
            })
    };

    
   

    return (
        <div>
            <div className='container-fluid'>
                
                <div className="card pust-top">
                    <div className="card-header">
                    <h4>Edit Task
                    {/* <Link to = {"/tasks"} className='btn btn-sm btn-primary float-end'>View Task</Link> */}
                    </h4>
                    </div>
                <div className="card-body">
                    <form action="" onSubmit={updateTask}>
                        <div className='form-group mb-3'>
                            <label htmlFor="task">Task</label>
                            <input className='form-control' type="text" name="task" onChange={handleInput} value={todoInput.task}/>
                            <span className='text-danger'>{errorInput.task} </span>
                        </div>
                        <div className='form-group mb-3'>
                            <label htmlFor="taskdate">Deadline</label>
                            <input className='form-control' type="date" name="taskdate" onChange={handleInput} value={todoInput.taskdate}/>
                            <span className='text-danger'>{errorInput.taskdate} </span>
                        </div>
                        
                        <button type="submit" className='btn btn-danger float-end'>Submit</button>
                    </form>
      </div>
        </div>
        </div>
        </div>
    )
};

export default EditTask