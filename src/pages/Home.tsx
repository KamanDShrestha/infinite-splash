import React, { useRef } from 'react';
import useSearchQuery from '../hooks/useSearchQuery';
// import useFetchImages, { FetchedImageType } from '../hooks/useFetchImages';

// import InfiniteScroll from 'react-infinite-scroll-component';
// import ImageGrid from '../components/ImageGrid';
// import ImageCard from '../components/ImageCard';

// import NavBar from '../components/NavBar';
// import Message from '../components/Message';
// import Loader from '../components/Loader';
import FetchedImages from '../components/FetchedImages';
import NavBar from '../components/NavBar';

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
