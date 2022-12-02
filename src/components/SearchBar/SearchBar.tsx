import { getSearchMovie } from "data/data-source";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Button, Form } from "react-bootstrap";

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
  // const [isValidated, setIsValidated] = useState(false);

  const handleSearch = async (event: any) => {
    event.preventDefault();

    if (searchValue !== "") {
      setIsSearching(true);
      try {
        console.log("mencioba");
        setIsLoading(true);
        const data = await getSearchMovie(searchValue);
        setDataMovie(data);
        console.log(data);
      } catch (error) {
        setError(error as string);
      } finally {
        setIsLoading(false);
      }
    } else setIsSearching(false);
  };

  const onChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchValue(event.target.value);

  return (
    <>
      <Form onSubmit={handleSearch}>
        <input placeholder="Search Movies..." onChange={onChangeSearchValue} />
        <Button type="submit">
          <FaSearch />
        </Button>
      </Form>
    </>
  );
};

export default SearchBar;
