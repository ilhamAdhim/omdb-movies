import { getLikedMovies } from "data/data-source";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface IFavoritedMovieProps {
  // TODO : Add props here
  // ...
}

const FavoritedMoviePage: React.FC<IFavoritedMovieProps> = () => {
  const navigate = useNavigate();
  const [dataLikedMovie, setDataLikedMovie] = useState<IMovieListSearchAPI>();

  useEffect(() => {
    const likedMovies = getLikedMovies();
    setDataLikedMovie(likedMovies);
  }, []);

  return (
    <Container>
      <Button onClick={() => navigate(-1)}>Kembali</Button>
      Ini fav movie
    </Container>
  );
};

export default FavoritedMoviePage;
