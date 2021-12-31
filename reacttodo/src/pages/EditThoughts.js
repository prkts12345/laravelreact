import React, {useState, useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import {  useNavigate, useParams  } from 'react-router-dom';

const EditThoughts = () => {
    

    const navigate = useNavigate();
    const [thoughtsInput, setThoughts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorInput, setError] = useState([]);
    const {id} = useParams();
    const handleInput = (e) => {
        return setThoughts({...thoughtsInput, [e.target.name]: e.target.value});
        
    }
    

    useEffect(() => {
        const thoughts_id = id;
        axios.get(`api/edit/${thoughts_id}`).then(res => {
                if(res.data.status === 200){
                    setThoughts(res.data.task);
                    setLoading(false);
                }
                else if(res.data.status === 404) {
                    swal(`error`, res.data.message);
                    navigate('/thoughts');
                }
            })
        
    }, [navigate, id]);

    const updatethoughts = (e) => {
        e.preventDefault();
        const data = {
            thoughts:thoughtsInput.thoughts,
            thoughtsdate:thoughtsInput.thoughtsdate
        }
        axios.put(`api/updatethoughts/${id}`,data).then(
            res => {
                if(res.data.status === 200){
                    swal('Success!', res.data.message);
                    setError([]);
                    navigate('/thoughts');
                }
                else if(res.data.status === 404) {
                    swal(`error`, res.data.message);
                    navigate('/thoughts');
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
                    <h4>Edit Thoughts
                    {/* <Link to = {"/thoughts"} className='btn btn-sm btn-primary float-end'>View Thoughts</Link> */}
                    </h4>
                    </div>
                <div className="card-body">
                    <form action="" onSubmit={updatethoughts}>
                        <div className='form-group mb-3'>
                            <label htmlFor="thoughts">Thoughts</label>
                            <input className='form-control' type="text" name="thoughts" onChange={handleInput} value={thoughtsInput.thoughts}/>
                            <span className='text-danger'>{errorInput.thoughts} </span>
                        </div>
                        <div className='form-group mb-3'>
                            <label htmlFor="thoughtsdate">Deadline</label>
                            <input className='form-control' type="date" name="thoughtsdate" onChange={handleInput} value={thoughtsInput.thoughtsdate}/>
                            <span className='text-danger'>{errorInput.thoughtsdate} </span>
                        </div>
                        
                        <button type="submit" className='btn btn-danger float-end'>Submit</button>
                    </form>
      </div>
        </div>
        </div>
        </div>
    )
};

export default EditThoughts