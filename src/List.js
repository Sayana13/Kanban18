import {withRouter} from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import './App.css';
import {useState, useEffect} from "react";
import Column from "./Column";

function List(props) {

    const [statuses, setStatuses] = useState([]);
    const columns = statuses.map((el) => el.status);
    const priority = [1, 2, 3, 4, 5];

    useEffect(() => {
        axios.get('http://nazarov-kanban-server.herokuapp.com/column')
            .then((res) => {
                setStatuses(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        props.getCards();
    }, []);

    const nextStatus = (card, direction) => {
        const corrector = direction === "right" ? +1 : -1;
        const currentStatus = card.status;
        const newStatus = columns[columns.indexOf(currentStatus) + corrector];
        axios.patch(`http://nazarov-kanban-server.herokuapp.com/card/${card._id}`, {status: newStatus})
    .then((res) => {
            props.getCards();
        })
            .catch((error) => {
                console.log(error);
            })
    };

    const deleteTask = (card) => {
        axios.delete(`http://nazarov-kanban-server.herokuapp.com/card/${card._id}`)
    .then((res) => {
            props.getCards();
        })
            .catch((error) => {
                console.log(error);
            })
    };

    const editTask = (card) => {
        axios.patch(`http://nazarov-kanban-server.herokuapp.com/card/${card._id}`, {...card})
    .then((res) => {
            props.getCards();
        })
            .catch((error) => {
                console.log(error);
            })
    };

    const changePriority = (cardId, priority, value) => {
        axios.patch(`http://nazarov-kanban-server.herokuapp.com/card/${cardId}`, {priority: priority + value})
    .then((res) => {
            props.getCards();
        })
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <div className="container">
            <center><h1>Kanban</h1></center>
            <hr/>
            <div className="row align-items-start">
                {statuses.map(el =>
                    <Column key={el._id}
                            status={el}
                            cards={props.cards}
                            nextStatus={nextStatus}
                            columns={columns}
                            priority={priority}
                            deleteTask={deleteTask}
                            editTask={editTask}
                            getCards={props.getCards}
                            changePriority={changePriority}
                    />)}
            </div>
        </div>
    );
};

export default withRouter(List);