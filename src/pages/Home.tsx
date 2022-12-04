import SearchBar from "components/SearchBar";
import CustomAlert from "components/CustomAlert";
import Information from "components/Information";
import Spinner from "components/Spinner";
import ModalMovieDetail from "components/ModalMovieDetail";
import MovieCardList from "components/MovieCardList";

import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { ReactComponent as SearchMovieSVG } from "assets/search-movie.svg";
import {
  initializeLocalStorage,
  isStorageExist,
  likeMovie,
} from "data/data-source";

interface IHomePageProps {
  // TODO : Add props here
  // ...
}

const HomePage: React.FC<IHomePageProps> = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isErrorModalShown, setIsErrorModalShown] = useState(false);
  const [error, setError] = useState("");

  const [dataMovie, setDataMovie] = useState<IMovieListSearchAPI>();
  // const [dataMovieCompareLocal, setDataMovieCompareLocal] =
  //   useState<IMovieItemSavedLocal[]>();

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedMovieID, setSelectedMovieID] = useState("");

  const handleLikeMovie = (movie: IMovieItemSavedLocal) => {
    likeMovie(movie);
  };

  // TODO : Get local data to compare which movie is liked
  // ...

  useEffect(() => {
    if (!isStorageExist()) initializeLocalStorage();
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
    <>
      <Container style={{ overflowX: "hidden" }}>
        <Link to="/favorited-movies">
          <Button>Menuju favorit</Button>
        </Link>
        Ini Home page
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 1em",
          }}
        >
          <h2 style={{ margin: "1.5em 0" }}>
            {isSearching ? "Movie Result" : "Search Movies"}
          </h2>

          <SearchBar
            setError={setError}
            setIsLoading={setIsLoading}
            setDataMovie={setDataMovie}
            setIsSearching={setIsSearching}
            setIsErrorModalShown={setIsErrorModalShown}
            // setDataMovieCompareLocal={setDataMovieCompareLocal}
          />
        </div>
        <br />
        {isSearching ? (
          <>
            {isLoading ? (
              <Spinner />
            ) : (
              <MovieCardList
                dataMovie={dataMovie?.Search || []}
                errorMsg={dataMovie?.Error}
                openModalDetail={openModalDetail}
                actionCard={handleLikeMovie}
              />
            )}
          </>
        ) : (
          <Information
            fullpage={false}
            title="Let's search some movies!"
            SVGComponent={
              <SearchMovieSVG
                style={{ height: "200px", width: "auto", padding: 20 }}
              />
            }
          />
        )}
        {error && (
          <CustomAlert
            title={error}
            variant="danger"
            isAlertOpen={isErrorModalShown}
            setIsAlertOpen={setIsErrorModalShown}
          />
        )}
      </Container>
      {isModalDetailOpen && (
        <ModalMovieDetail
          imdbIDCurrent={selectedMovieID}
          isModalDetailOpen={isModalDetailOpen}
          handleCloseModal={closeModalDetail}
        />
      )}
    </>
  );
};

export default HomePage;
