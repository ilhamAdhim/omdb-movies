import HomePage from "./pages/Home";
import FavoritedMoviePage from "./pages/Favorited";
import NoMatchPage from "./pages/NoMatchPage";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
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
