import 'bootstrap/dist/css/bootstrap.css'
import { withRouter } from 'react-router';
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CreateTask(props) {

    const [taskName, setTaskName]= useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskPriority, setTaskPriority] = useState(1);
    const [taskStatus, setTaskStatus] = useState("to do");

    const addToList = () => {
        axios.post('https://nazarov-kanban-server.herokuapp.com/card', {
            name: taskName,
            description: taskDescription,
            priority: taskPriority,
            status: taskStatus,
        }).then((res)=> {
            console.log(res.data);
            props.getCards();
        }).catch((err) => {
            console.log(err);
        })
    };

    return (
        <div>
            <h2>Create</h2>
            <form >
                <div className="input-group input-group-sm mb-3">
                    <label htmlFor="inputEmail3" className="input-group-text" id="inputGroup-sizing-sm"><h5>Name</h5></label>
                    <div className="col-sm-10">
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={(e) => setTaskName(e.target.value)} placeholder="Add name"/>
                    </div>
                </div>
                <div className="input-group input-group-sm mb-3">
                    <label  className="input-group-text" id="inputGroup-sizing-sm"><h5>Description</h5></label>
                    <div className="col-sm-10">
                        <input name="description"type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" id="inputPassword3" placeholder="Add description" onChange={(e) => setTaskDescription(e.target.value)}/>
                    </div>
                </div>
                <div className="input-group input-group-sm mb-3">
                    <label htmlFor="inputPassword3" className="input-group-text" id="inputGroup-sizing-sm"><h5>Priority</h5></label>
                    <div className="col-sm-10">
                        <select value={taskPriority} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={(e) => setTaskPriority(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="input-group input-group-sm mb-3">
                    <label htmlFor="inputPassword3" className="input-group-text" id="inputGroup-sizing-sm"><h5>Status</h5></label>
                    <div className="col-sm-10">
                        <select value={taskStatus} name="status" className="input-group-text" id="inputGroup-sizing-sm" aria-label="Default select example" onChange={(e) => setTaskStatus(e.target.value)}>
                            <option value="to do">Todo</option>
                            <option value="progress">Progress</option>
                            <option value="review">Review</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                </div>
                <Link to ="/" >
                    <button className="btn btn-light" onClick={addToList}>Save</button>
                </Link>
                <Link to ="/" >
                    <button className="btn btn-light">Cancel</button>
                </Link>
            </form>
        </div>
    )
}

export default withRouter(CreateTask)