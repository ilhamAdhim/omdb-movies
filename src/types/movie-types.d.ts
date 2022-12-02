interface IMovieListSearchAPI {
  Search: IMovieItemSearchAPI[];
  totalResults: string;
  Response: string;
}

interface IMovieItemSearchAPI {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface IMovieRatingAPI {
  Source: string;
  Value: string;
}

interface IMovieItemByIDAPI extends IMovieItemSearchAPI {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: IMovieRatingAPI[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

interface IMovieItemSavedLocal extends IMovieItemSearchAPI {
  isLiked: boolean;
}
