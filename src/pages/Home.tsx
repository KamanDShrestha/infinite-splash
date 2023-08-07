import useSearchQuery from '../hooks/useSearchQuery';
import FetchedImages from '../components/FetchedImages';
import NavBar from '../components/NavBar';
import { useRef } from 'react';

//This component acts as a home screen from which users can search for images, view them and save them to localStorage
const Home = () => {
  //useRef hook for getting the input text without rerendering the application and presisting the data over rerender
  const searchInput = useRef<HTMLInputElement>(null);

  //Getting the search query provided to search input field as well as method to set the search query by clicking Enter key
  const { searchQuery, setSearchQuery } = useSearchQuery(searchInput);

  return (
    <>
      <NavBar searchInput={searchInput} setSearchQuery={setSearchQuery} />
      <FetchedImages searchInput={searchInput} searchQuery={searchQuery} />
    </>
  );
};

export default Home;
