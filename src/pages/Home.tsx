import MovieCard from "components/MovieCard";
import SearchBar from "components/SearchBar";
import CustomAlert from "components/CustomAlert";
import Information from "components/Information";

import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getSearchMovie } from "data/data-source";
import { Button, Container } from "react-bootstrap";
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

  const [searchValue, setSearchValue] = useState("");
  const [dataMovie, setDataMovie] = useState<IMovieListSearchAPI>();

  const handleSearch = useCallback(
    () => async () => {
      setIsSearching(true);
      try {
        setIsLoading(true);
        const data = await getSearchMovie(searchValue);
        setDataMovie(data);
      } catch (error) {
        setError(error as string);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

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
      <SearchBar />
      <Button onClick={() => setIsSearching((prev) => !prev)}>Search</Button>
      <br />
      {/* {!isLoading ? dataMovie?.Search?.map((movie) => (<> {movie.Title} </>))} */}
      {isSearching ? (
        <>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <h2>Hasil movie</h2>

              <MovieCard />
              <MovieCard />
              <MovieCard />
              <MovieCard />
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
