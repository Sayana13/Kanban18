import './App.css';
import {
    BrowserRouter as Router,
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import List from "./List";
import CreateTask from "./CreateTask";
import axios from "axios";
import {useState} from "react";

function App() {
    const [cards, setCards] = useState([]);

    const getCards = () => {
        axios.get('http://nazarov-kanban-server.herokuapp.com/card')
            .then((res) => {
                setCards(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <BrowserRouter>
            <Router>
                <Link to="/">Planner</Link>{' '}
                <Link to="/create">New Task</Link>

                <Switch>
                    <Route path="/create">
                        <CreateTask getCards={getCards}/>
                    </Route>
                    <Route path="/">
                        <List getCards={getCards} cards={cards} setCards={setCards}/>
                    </Route>
                </Switch>
            </Router>
        </BrowserRouter>
    );
}

export default App;