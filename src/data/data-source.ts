import axios from "axios";

export const getSearchMovie = async (title: string) => {
  console.log(title, "title di api");
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${title}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMovieById = async (id: string) => {
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getLikedMovies = () => {
  let likedMovies = localStorage.getItem("likedMovies");
  return likedMovies ? JSON.parse(likedMovies) : [];
};

export const likeMovie = (movieItem: IMovieItemSavedLocal) => {
  localStorage.setItem("likedMovies", JSON.stringify(movieItem));
};

export const unlikeMovie = (movieItem: IMovieItemSavedLocal) => {
  let newList = getLikedMovies().filter(
    (movie: IMovieItemSavedLocal) => movie.imdbID !== movieItem.imdbID
  );

  localStorage.setItem("likedMovies", JSON.stringify(newList));
};
