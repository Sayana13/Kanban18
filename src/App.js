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
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to="/">List</Link>
                                </li><span> </span>
                                <li className="nav-item">
                                    <Link to="/create">Create</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
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