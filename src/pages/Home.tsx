import MovieCard from "components/MovieCard";
import SearchBar from "components/SearchBar";
import CustomAlert from "components/CustomAlert";
import Information from "components/Information";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { ReactComponent as SearchMovieSVG } from "assets/search-movie.svg";
import Spinner from "components/Spinner";

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

  useEffect(() => {
    console.log(dataMovie);
  }, [dataMovie]);

  return (
    <Container>
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
      {/* <Button onClick={() => setIsSearching((prev) => !prev)}>Search</Button> */}
      <br />
      {/* {!isLoading ? dataMovie?.Search?.map((movie) => (<> {movie.Title} </>))} */}
      {isSearching ? (
        <>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <h2>Hasil movie</h2>
              <Row xs={1} sm={1} md={2} lg={3}>
                {dataMovie?.Search?.map((movie: IMovieItemSearchAPI) => (
                  <MovieCard
                    key={movie.imdbID}
                    title={movie.Title}
                    year={movie.Year}
                    poster={movie.Poster}
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
  );
};

export default HomePage;
