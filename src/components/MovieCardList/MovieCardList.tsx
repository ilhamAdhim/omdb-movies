import Information from "components/Information";
import MovieCard from "components/MovieCard/MovieCard";

import { Row } from "react-bootstrap";
import { ReactComponent as SearchMovieSVG } from "assets/search-movie.svg";

interface IMovieCardListProps {
  dataMovie: IMovieItemSearchAPI[] | IMovieItemSavedLocal[];
  errorMsg?: string;
  openModalDetail: (imdbID: string) => void;
}

const MovieCardList: React.FC<IMovieCardListProps> = ({
  dataMovie,
  errorMsg,
  openModalDetail,
}) => {
  return (
    <>
      {dataMovie?.length > 0 ? (
        <Row xs={1} sm={1} md={2} lg={3}>
          {dataMovie?.map((movie: IMovieItemSearchAPI, id: number) => (
            <MovieCard
              id={id}
              key={movie.imdbID}
              title={movie.Title}
              year={movie.Year}
              poster={movie.Poster}
              openModalDetail={openModalDetail}
              {...movie}
            />
          ))}
        </Row>
      ) : (
        <Information
          fullpage={false}
          title={errorMsg || "No Result"}
          SVGComponent={
            <SearchMovieSVG
              style={{ height: "200px", width: "auto", padding: 20 }}
            />
          }
        />
      )}
    </>
  );
};

export default MovieCardList;
