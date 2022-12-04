import styles from "./Searchbar.module.css";
import React, { useCallback, useState } from "react";
import { getSearchMovie } from "data/data-source";

interface ISearchbarProps {
  // TODO: Can be converted into redux reducers
  // ...
  setIsLoading: (state: boolean) => void;
  setIsErrorModalShown: (state: boolean) => void;
  setError: (state: string) => void;
  setDataMovie: (state: IMovieListSearchAPI) => void;
  setIsSearching: (state: boolean) => void;
  setDataMovieCompareLocal?: (state: IMovieItemSavedLocal[]) => void;
}

const SearchBar: React.FC<ISearchbarProps> = ({
  setIsLoading,
  setIsErrorModalShown,
  setError,
  setDataMovie,
  setIsSearching,
  setDataMovieCompareLocal,
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

        // Compare with local data
        // const localData = JSON.parse(localStorage.getItem("likedMovies") || "[]");
        // if(localData.length > 0){

        //   setDataMovieCompareLocal()
        // }
      } catch (error) {
        setError(error as string);
        setIsErrorModalShown(true);
      } finally {
        setIsLoading(false);
      }
    } else setIsSearching(false);
  };

  const resetKeyword = useCallback(() => {
    setSearchValue("");
    setIsSearching(false);
  }, [setIsSearching]);

  const onChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchValue(event.target.value);

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
