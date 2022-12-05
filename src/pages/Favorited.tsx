import ModalMovieDetail from "components/ModalMovieDetail";
import MovieCardList from "components/MovieCardList";

import { getLikedMovies } from "data/data-source";
import { useCallback, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FavoritedMoviePage: React.FC = () => {
  const navigate = useNavigate();

  const [selectedMovieID, setSelectedMovieID] = useState("");
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [dataLikedMovie, setDataLikedMovie] =
    useState<IMovieItemSavedLocal[]>();

  useEffect(() => {
    const likedMovies = getLikedMovies();
    setDataLikedMovie(likedMovies);
  }, []);

  const openModalDetail = useCallback(async (id: string) => {
    setSelectedMovieID(id);
    setIsModalDetailOpen(true);
  }, []);

  const closeModalDetail = () => {
    setSelectedMovieID("");
    setIsModalDetailOpen(false);
  };

  return (
    <Container style={{ marginTop: "1em" }}>
      <Button variant="outline-primary" onClick={() => navigate(-1)}>
        <FaArrowLeft />
        <span style={{ marginLeft: "1em" }}>Back to main menu</span>
      </Button>

      <h5 style={{ marginTop: "1em" }}>Favorited Movies</h5>

      <MovieCardList
        dataMovie={dataLikedMovie || []}
        errorMsg={"Add some movies to your favorite list"}
        openModalDetail={openModalDetail}
      />

      {isModalDetailOpen && (
        <ModalMovieDetail
          imdbIDCurrent={selectedMovieID}
          isModalDetailOpen={isModalDetailOpen}
          handleCloseModal={closeModalDetail}
        />
      )}
    </Container>
  );
};

export default FavoritedMoviePage;
