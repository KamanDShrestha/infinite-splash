import React, { useEffect } from 'react';
import useFetchImages from './hooks/useFetchImages';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useRef } from 'react';
const App = () => {
  // console.log(import.meta.env.VITE_ACCESS_KEY);
  // const [searchQuery, setSearchQuery] = useState('');

  const searchInput = useRef<HTMLInputElement>(null);
  console.log('Current Value', searchInput.current?.value);
  // const searchQuery = useRef('');

  // useEffect(() => {
  //   const currentInputValue = searchInput.current?.value;
  //   function setSearchQuery(e) {
  //     if (e.code.toLowerCase() === 'enter') {
  //       // searchQuery = searchInput.current?.value || '';
  //       console.log('Enter pressed');
  //       searchQuery.current = currentInputValue || '';
  //       console.log('Search Query', searchQuery.current);
  //     }
  //   }

  //   document.addEventListener('keydown', (e) => setSearchQuery(e));
  // }, []);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    function setQuery(e: KeyboardEvent) {
      if (e.code.toLowerCase() === 'enter') {
        console.log('Enter pressed');
        setSearchQuery(searchInput.current?.value || '');
      }
    }

    document.addEventListener('keydown', (e) => setQuery(e));
  }, []);

  console.log('Search Query', searchQuery);

  const { data, isFetching, fetchNextPage, error, hasNextPage } =
    useFetchImages(searchQuery);

  console.log(data);
  const dataLength =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;
  console.log('DataLength:', dataLength);
  console.log('Is Fetching', isFetching);
  console.log('hasNextPage', hasNextPage);
  return (
    <>
      <input type='text' ref={searchInput} />
      <InfiniteScroll
        dataLength={dataLength}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.results.map((image) => (
              <img src={image.urls.small} key={image.id} />
            ))}
          </React.Fragment>
        ))}
      </InfiniteScroll>
    </>
  );
};

export default App;
