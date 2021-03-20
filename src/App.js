import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import {useState, useEffect} from "react";
import Column from "./Column";
import Card from "./Card";


function App() {
    const [statuses, setStatuses] = useState([]);

    const [card, setCard] = useState([]);
    const columns = statuses.map((el) => el.status);
    const priority = [1, 2, 3, 4, 5];


    const getCards = () => {
        axios.put('http://nazarov-kanban-server.herokuapp.com/column')
            .then((res) => {
                getCards();
            })
            .catch((error) => {
                console.log(error);
            })
    };

    useEffect(() => {
        getCards();
    }, []);

    const nextStatus = (card, direction) => {
        const corrector = direction === 'right' ? +1 : -1;

        const currentStatus = card.status;
        const newStatus = columns[columns.indexOf(currentStatus) + corrector];

        axios.patch(`http://nazarov-kanban-server.herokuapp.com/${card._id}`, {status: newStatus})
            .then((res) => {
                getCards();
            })
            .catch((error) => {
                console.log(error);
            })
    };
    const prevStatus = (card) => {
        let newStatus = '';
        const currentStatus = card.status;
        switch (currentStatus) {
            case 'done':
                newStatus = 'review';
                break;
            case 'review':
                newStatus = 'progress';
                break;
            case 'progress':
                newStatus = 'to do';
                break;
            default:
                newStatus = currentStatus;
        }
        axios.patch(`http://nazarov-kanban-server.herokuapp.com/${card._id}`, {status: newStatus})
            .then((res) => {
                getCards();
            })
            .catch((error) => {
                console.log(error);
            })
    };
    useEffect(() => {
        axios.get('http://nazarov-kanban-server.herokuapp.com/column')
            .then((res) => {
                setStatuses(res.data);
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    console.log("card", statuses)

    useEffect(() => {
        axios.get('http://nazarov-kanban-server.herokuapp.com/card')
            .then((res) => {
                setCard(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <div className="container">
            <h1>Kanban</h1>
            <div className="row align-items-start">
                {statuses.map(el => <Column status={el} card={card}/>)}
                columns={columns};
                priority={priority}


            </div>
        </div>
    );
}

export default App;
