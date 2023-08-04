import React, { useRef } from 'react';
import useFetchImages from './hooks/useFetchImages';
import InfiniteScroll from 'react-infinite-scroll-component';

import useSearchQuery from './hooks/useSearchQuery';
import { FaSearch } from 'react-icons/fa';
import logo from './assets/logo.png';
import ImageCard from './components/ImageCard';
import ImageGrid from './components/ImageGrid';
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
      <div className='flex my-0 px-3 w-[100vw] items-center gap-4 justify-center'>
        <img src={logo} className='h-20 ' />
        <div className='flex p-5 w-[100vw] items-center gap-4 justify-center'>
          <input
            type='text'
            ref={searchInput}
            className='h-12 p-5 border border-stone-800 w-[60%] rounded-2xl'
          />

          <FaSearch
            onClick={() => setSearchQuery(searchInput.current?.value || '')}
            size={30}
            className='hover:cursor-pointer'
          />
        </div>
      </div>

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
        <ImageGrid>
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results.map((image) => (
                <ImageCard image={image} />
              ))}
            </React.Fragment>
          ))}
        </ImageGrid>
      </InfiniteScroll>
    </>
  );
};

export default App;
