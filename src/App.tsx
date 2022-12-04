import HomePage from "./pages/Home";
import FavoritedMoviePage from "./pages/Favorited";
import NoMatchPage from "./pages/NoMatchPage";
import Aos from "aos";
import "aos/dist/aos.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "Omdb API Movie";
    Aos.init();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorited-movies" element={<FavoritedMoviePage />} />
        <Route path="*" element={<NoMatchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
