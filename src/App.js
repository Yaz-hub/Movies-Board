import React from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MoviesList from "./components/MoviesList/MoviesList"
import Navigation from "./components/Navigation";
import AddMovie from "./components/AddMovie/AddMovie";
import Footer from "./components/Footer/Footer";
import MovieDetail from "./components/MovieDetail/MovieDetail" 
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import EditMovie from "./components/EditMovie";

function App() {
  return (
    <div id="page-container">
      <Navigation />
      <div id="content-wrap">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MoviesList />} />
            <Route path="/movies" element={<MoviesList />} />
            <Route path="/add" element={<AddMovie />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/movies/:id/edit" element={<EditMovie />} />
          </Routes>
        </BrowserRouter>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
