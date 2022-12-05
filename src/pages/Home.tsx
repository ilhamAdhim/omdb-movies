import SearchBar from "components/SearchBar";
import CustomAlert from "components/CustomAlert";
import Information from "components/Information";
import Spinner from "components/Spinner";
import ModalMovieDetail from "components/ModalMovieDetail";
import MovieCardList from "components/MovieCardList";

import { Link, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { ReactComponent as SearchMovieSVG } from "assets/search-movie.svg";
import {
  getLikedMovies,
  initializeLocalStorage,
  isStorageExist,
} from "data/data-source";
import { RiMovie2Fill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { updateMovies } from "features/movie/movieSlice";

const HomePage: React.FC = () => {
  const appDispatch = useAppDispatch();
  const { dataMovies, status } = useAppSelector((state) => state.movie);

  const [isErrorModalShown, setIsErrorModalShown] = useState(false);
  const [error, setError] = useState("");

  const [dataMovie, setDataMovie] = useState<IMovieListSearchAPI>();
  const [likedMovies, setLikedMovies] = useState<IMovieItemSavedLocal[]>([]);

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedMovieID, setSelectedMovieID] = useState("");

  useEffect(() => {
    let comparedMovies: IMovieItemSavedLocal[] | undefined = [];
    if (dataMovies?.length === 0 || status === "loading") {
      if (likedMovies?.length > 0) {
        comparedMovies = dataMovie?.Search?.map((movie) => {
          const isLiked = likedMovies?.find(
            (likedMovie: IMovieItemSavedLocal) =>
              likedMovie.imdbID === movie.imdbID
          );
          return {
            ...movie,
            isLiked: !!isLiked,
          };
        });
      } else {
        comparedMovies = dataMovie?.Search?.map((movie) => {
          return {
            ...movie,
            isLiked: false,
          };
        });
      }
      appDispatch(updateMovies(comparedMovies || []));
    }
  }, [dataMovie, likedMovies, appDispatch, status]);

  const location = useLocation();

  useEffect(() => {
    console.log("Location changed", location);
  }, [location]);

  useEffect(() => {
    if (!isStorageExist()) initializeLocalStorage();
    setLikedMovies(getLikedMovies());
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
          <Button variant="danger" style={{ marginTop: "1em" }}>
            <span style={{ marginRight: ".5em" }}> My Movies</span>
            <RiMovie2Fill />
          </Button>
        </Link>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 1em",
          }}
        >
          <h2 style={{ margin: "1.5em 0" }}>
            {status === "initial-load" ? "Movie Result" : "Search Movies"}
          </h2>

          <SearchBar
            setError={setError}
            setDataMovie={setDataMovie}
            setIsErrorModalShown={setIsErrorModalShown}
          />
        </div>
        <br />
        {status === "initial-load" ? (
          <Information
            fullpage={false}
            title="Let's search some movies!"
            SVGComponent={
              <SearchMovieSVG
                style={{ height: "200px", width: "auto", padding: 20 }}
              />
            }
          />
        ) : (
          <>
            {status === "loading" ? (
              <Spinner />
            ) : (
              <MovieCardList
                dataMovie={dataMovies || []}
                errorMsg={dataMovie?.Error}
                openModalDetail={openModalDetail}
              />
            )}
          </>
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
