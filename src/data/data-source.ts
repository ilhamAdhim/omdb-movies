import axios from "axios";

export const getSearchMovie = async (title: string) => {
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
      `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const isStorageExist = () => {
  if (Storage === undefined) {
    alert("Local Storage is not supported by your browser");
    return false;
  }
  return true;
};

export const initializeLocalStorage = () =>
  localStorage.setItem("likedMovies", JSON.parse("[]"));

export const getLikedMovies = () => {
  let likedMovies = localStorage.getItem("likedMovies");
  return likedMovies ? JSON.parse(likedMovies) : [];
};

export const likeMovie = (movieItem: IMovieItemSavedLocal) => {
  let likedMovies = getLikedMovies();
  localStorage.setItem(
    "likedMovies",
    JSON.stringify([...likedMovies, movieItem])
  );
};

export const unlikeMovie = (movieItem: IMovieItemSavedLocal) => {
  let newList = getLikedMovies().filter(
    (movie: IMovieItemSavedLocal) => movie.imdbID !== movieItem.imdbID
  );

  localStorage.setItem("likedMovies", JSON.stringify(newList));
};
