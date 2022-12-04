import MovieCard from "components/MovieCard";
import SearchBar from "components/SearchBar";
import CustomAlert from "components/CustomAlert";
import Information from "components/Information";
import Spinner from "components/Spinner";

import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { ReactComponent as SearchMovieSVG } from "assets/search-movie.svg";
import ModalMovieDetail from "components/ModalMovieDetail";

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
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedMovieID, setSelectedMovieID] = useState("");

  useEffect(() => {
    console.log(dataMovie);
  }, [dataMovie]);

  // TODO : Get local data to compare which movie is liked
  // ...

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
          <Button>Menuju detail</Button>
        </Link>
        Ini Home page
        <br />
        <SearchBar
          setError={setError}
          setIsLoading={setIsLoading}
          setDataMovie={setDataMovie}
          setIsSearching={setIsSearching}
          setIsErrorModalShown={setIsErrorModalShown}
        />
        <br />
        {isSearching ? (
          <>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <h2 style={{ margin: "1.5em 0" }}>Movie Result</h2>
                <Row xs={1} sm={1} md={2} lg={3}>
                  {dataMovie?.Search?.map((movie: IMovieItemSearchAPI) => (
                    <MovieCard
                      key={movie.imdbID}
                      title={movie.Title}
                      year={movie.Year}
                      poster={movie.Poster}
                      openModalDetail={openModalDetail}
                      {...movie}
                    />
                  ))}
                </Row>
              </>
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
