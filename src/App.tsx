import React, { useRef } from 'react';
import useFetchImages from './hooks/useFetchImages';
import InfiniteScroll from 'react-infinite-scroll-component';

import useSearchQuery from './hooks/useSearchQuery';
import { FaSearch } from 'react-icons/fa';

const App = () => {
  //useRef hook for getting the input text without rerendering the application
  const searchInput = useRef<HTMLInputElement>(null);
  console.log('Current Value', searchInput.current?.value);

  //setting the state of the search query after pressing the enter key
  // const [searchQuery, setSearchQuery] = useState('');

  // useEffect(() => {
  //   function setQuery(e: KeyboardEvent) {
  //     if (e.code.toLowerCase() === 'enter') {
  //       console.log('Enter pressed');
  //       setSearchQuery(searchInput.current?.value || '');
  //     }
  //   }

  //   document.addEventListener('keydown', (e) => setQuery(e));
  // }, []);

  const { searchQuery, setSearchQuery } = useSearchQuery(searchInput);

  console.log('Search Query', searchQuery);

  const { data, isFetching, fetchNextPage, error, hasNextPage } =
    useFetchImages(searchQuery);

  console.log(data);
  const dataLength =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;
  console.log('DataLength:', dataLength);
  console.log('Is Fetching', isFetching);
  console.log('hasNextPage', hasNextPage);

  if (error) return <h1>Error Fetching the data</h1>;

  return (
    <>
      <input type='text' ref={searchInput} />
      <FaSearch
        onClick={() => setSearchQuery(searchInput.current?.value || '')}
      />
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
