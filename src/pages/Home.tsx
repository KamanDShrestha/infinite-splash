import React, { useEffect, useRef } from 'react';
import useSearchQuery from '../hooks/useSearchQuery';
import useFetchImages, { FetchedImageType } from '../hooks/useFetchImages';
import { FaSearch } from 'react-icons/fa';
import InfiniteScroll from 'react-infinite-scroll-component';
import ImageGrid from '../components/ImageGrid';
import ImageCard from '../components/ImageCard';
import Logo from '../components/Logo';
import { NavLink } from 'react-router-dom';

const Home = () => {
  //useRef hook for getting the input text without rerendering the application
  const searchInput = useRef<HTMLInputElement>(null);
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

  const savedImages = useRef([] as FetchedImageType[]);

  useEffect(() => {
    savedImages.current = [];
  }, [searchQuery]);

  if (error) return <h1>Error Fetching the data</h1>;

  return (
    <>
      <div className='flex my-0 px-3 w-[100vw] items-center gap-4 justify-center'>
        <Logo />
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
        <NavLink to='/savedImages'> Saved Images </NavLink>
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
                <ImageCard
                  image={image}
                  usedSearchQuery={searchQuery}
                  savedImages={savedImages}
                />
              ))}
            </React.Fragment>
          ))}
        </ImageGrid>
      </InfiniteScroll>
    </>
  );
};

export default Home;
