import React from "react";
// import logo from './logo.svg';
import './styles.css';
// import Navigation from "./components/navigation";
// import Tuits from "./components/tuits";
// import WhatsHappening from "./components/whats-happening/whats-happening";
// import Bookmarks from "./components/bookmarks/bookmarks";
import {Tuiter} from "./components/tuiter";

function App() {
    console.log("Node Server: " + process.env.REACT_APP_BASE_URL)
    console.log("Test: " + process.env.REACT_APP_TEST)
    return (
        <Tuiter/>
    );
}

export default App;
