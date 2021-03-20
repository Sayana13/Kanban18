import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import './App.css';
import {useState, useEffect} from "react";
import Column from "./Column";

function App() {

    const [statuses, setStatuses] = useState([]);
    const [cards, setCards] = useState([]);
    const columns = statuses.map((el) => el.status);
    const priority = [1, 2, 3, 4, 5];

    console.log(statuses)

    const getCards = () => {
        axios.get('http://nazarov-kanban-server.herokuapp.com/card')
            .then((res) => {
                setCards(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

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
        getCards();
    }, []);

    const nextStatus = (card, direction) => {
        const corrector = direction === "right" ? +1 : -1;
        const currentStatus = card.status;
        const newStatus = columns[columns.indexOf(currentStatus) + corrector];

        axios.patch(`http://nazarov-kanban-server.herokuapp.com/card/${card._id}`, {status: newStatus})
            .then((res) => {
                getCards();
            })
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <div className="container">
            <h1>Kanban</h1>
            <div className="row align-items-start">
                {statuses.map(el =>
                    <Column key={el._id}
                            status={el}
                            cards={cards}
                            nextStatus={nextStatus}
                            columns={columns}
                            priority={priority}
                    />)}
            </div>
        </div>
    );
}

export default App;