import React, {useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'; 

const AddThoughts = () => {
    const history = useNavigate();
    const [thoughtsInput, setThoughts] = useState({
        thoughts: "",
        thoughtsdate: "",
        error_list: [],
        
    });
    const handleInput = (e) => {
        e.persist();
        setThoughts({...thoughtsInput, [e.target.name]: e.target.value});
    };
    const saveThoughts = (e) => {
        e.preventDefault();
        const data = {
            thoughts: thoughtsInput.thoughts,
            thoughtsdate: thoughtsInput.thoughtsdate,
        }
        axios.post(`api/addthoughts`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "Success");
                setThoughts({
                    thoughts: "",
                    thoughtsdate: "",
                    error_list: [],
                });
                history("/thoughts")
            }
            else if (res.data.status === 422) {
                setThoughts({...thoughtsInput, error_list: res.data.validate})
            }
        })

    };
    return (
        <div>
            <div className='container-fluid'>
            <div className="card push-top">
                <div className="card-header">
                <h4>Add Thoughts
                {/* <Link to = {"/thoughts"} className='btn btn-sm btn-primary float-end'>Thoughts List</Link> */}
                </h4>
                </div>
            <div className="card-body">
                <form onSubmit={saveThoughts}>
                    <div className='form-group mb-3'>
                        <label htmlFor="thoughts">Thoughts</label>
                        <input className='form-control' type="text" name="thoughts" onChange={handleInput} value={thoughtsInput.thoughts}/>
                        <span className='text-danger'>{thoughtsInput.error_list.thoughts} </span>
                    </div>
                    <div className='form-group mb-3'>
                        <label htmlFor="thoughtsdate">Date</label>
                        <input className='form-control' type="date" name="thoughtsdate" onChange={handleInput} value={thoughtsInput.thoughtsdate}/>
                        <span className='text-danger'>{thoughtsInput.error_list.thoughtsdate} </span>
                    </div>
                    
                    <button className='btn btn-danger float-end'>Submit</button>
                </form>
            </div>
            </div>
            </div>
        </div>
    )
}

export default AddThoughts
