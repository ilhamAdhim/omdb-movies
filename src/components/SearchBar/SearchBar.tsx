import { getSearchMovie } from "data/data-source";
import React, { useState } from "react";
import styles from "./Searchbar.module.css";

interface ISearchbarProps {
  // TODO: Can be converted into redux reducers
  // ...
  setIsLoading: (state: boolean) => void;
  setIsErrorModalShown: (state: boolean) => void;
  setError: (state: string) => void;
  setDataMovie: (state: IMovieListSearchAPI) => void;
  setIsSearching: (state: boolean) => void;
}

const SearchBar: React.FC<ISearchbarProps> = ({
  setIsLoading,
  setIsErrorModalShown,
  setError,
  setDataMovie,
  setIsSearching,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = async (event: any) => {
    event.preventDefault();

    if (searchValue !== "") {
      setIsSearching(true);
      try {
        setIsLoading(true);
        const data = await getSearchMovie(searchValue);
        setDataMovie(data);
        console.log(data);
      } catch (error) {
        setError(error as string);
        setIsErrorModalShown(true);
      } finally {
        setIsLoading(false);
      }
    } else setIsSearching(false);
  };

  const onChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchValue(event.target.value);

  return (
    <>
      <form className={styles["search-box"]} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search Movies..."
          onChange={onChangeSearchValue}
        />
        <button type="reset" />
      </form>
    </>
  );
};

export default SearchBar;
