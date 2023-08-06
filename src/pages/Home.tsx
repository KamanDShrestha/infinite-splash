import useSearchQuery from '../hooks/useSearchQuery';
import FetchedImages from '../components/FetchedImages';
import NavBar from '../components/NavBar';
import { useRef } from 'react';

const Home = () => {
  //useRef hook for getting the input text without rerendering the application
  const searchInput = useRef<HTMLInputElement>(null);
  const { searchQuery, setSearchQuery } = useSearchQuery(searchInput);

  console.log('Search Query', searchQuery);

  return (
    <>
      <NavBar searchInput={searchInput} setSearchQuery={setSearchQuery} />

      <FetchedImages searchInput={searchInput} searchQuery={searchQuery} />
    </>
  );
};

export default Home;
