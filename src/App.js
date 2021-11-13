import React from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MoviesList from "./components/MoviesList"
import MovieDetail from "./components/MovieDetail";
import Navigation from "./components/Navigation";
import AddMovie from "./components/AddMovie/AddMovie";
import Footer from "./components/Footer/Footer";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Navigation />
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MoviesList />} />
            <Route path="/movies" element={<MoviesList />} />
            <Route path="/add" element={<AddMovie />} />
            <Route path="/movies/:id" element={<MovieDetail/>} />
          </Routes>
        </BrowserRouter>
    </div>
    <Footer></Footer>
    </div>
  );
}

export default App;
