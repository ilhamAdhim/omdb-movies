import styles from "./Searchbar.module.css";
import React, { useCallback, useEffect } from "react";
import { getSearchMovie } from "data/data-source";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { updateSearchValue, updateStatus } from "features/movie/movieSlice";

interface ISearchbarProps {
  setIsErrorModalShown: (state: boolean) => void;
  setError: (state: string) => void;
  setDataMovie: (state: IMovieListSearchAPI) => void;
}

const SearchBar: React.FC<ISearchbarProps> = ({
  setIsErrorModalShown,
  setError,
  setDataMovie,
}) => {
  const dispatch = useAppDispatch();

  const searchValue = useAppSelector((state) => state.movie.searchValue);

  const handleSearch = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue !== "") {
      try {
        dispatch(updateStatus("loading"));
        const data = await getSearchMovie(searchValue);
        setDataMovie(data);
      } catch (error) {
        setError(error as string);
        setIsErrorModalShown(true);
      } finally {
        dispatch(updateStatus("idle"));
      }
    } else dispatch(updateStatus("initial-load"));
  };

  const resetKeyword = useCallback(() => {
    dispatch(updateSearchValue(""));
    dispatch(updateStatus("initial-load"));
  }, [dispatch]);

  useEffect(() => {
    if (searchValue === "") dispatch(updateStatus("initial-load"));
  }, [searchValue, dispatch]);

  const onChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(updateSearchValue(event.target.value));

  return (
    <div style={{ margin: "auto 0" }}>
      <form className={styles["search-box"]} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search Movies..."
          onChange={onChangeSearchValue}
        />
        <button type="reset" onClick={resetKeyword} />
      </form>
    </div>
  );
};

export default SearchBar;
