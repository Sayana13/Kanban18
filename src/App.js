import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import {useState, useEffect} from "react";
import Column from "./Column";
import Card from "./Card";


function App() {
    const [statuses, setStatuses] = useState([]);

    const [card, setCard] =useState([]);

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

    useEffect(()=>{
        axios.get('http://nazarov-kanban-server.herokuapp.com/card')
            .then((res)=> {
                setCard(res.data);
            })
            .catch((error)=>{
                console.log(error);
            })
    }, [])

    return (
        <div className="container">
            <h1>Kanban</h1>
            <div className="row align-items-start">
                {statuses.map(el => <Column status={el} card={card}/>)}




            </div>
        </div>
    );
}

export default App;
