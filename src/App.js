import React from "react";
import "./App.css";
import MoviesList from "./components/MoviesList"
import "bootstrap/dist/css/bootstrap.min.css";
import MovieDetail from "./components/MovieDetail";
import Navigation from "./components/Navigation";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div style={{ backgroundImage: `url("bg.jpeg")` }}>
      <Navigation />
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MoviesList />} />
            <Route path="movies" element={<MoviesList />} />
            <Route path="/movies/:id" element={<MovieDetail/>} />

          </Routes>
        </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
