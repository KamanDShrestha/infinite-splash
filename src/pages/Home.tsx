import React, { useEffect, useRef } from 'react';
import useSearchQuery from '../hooks/useSearchQuery';
import useFetchImages, { FetchedImageType } from '../hooks/useFetchImages';

import InfiniteScroll from 'react-infinite-scroll-component';
import ImageGrid from '../components/ImageGrid';
import ImageCard from '../components/ImageCard';

import NavBar from '../components/NavBar';
import Message from '../components/Message';
import Loader from '../components/Loader';

const Home = () => {
  //useRef hook for getting the input text without rerendering the application
  const searchInput = useRef<HTMLInputElement>(null);
  const { searchQuery, setSearchQuery } = useSearchQuery(searchInput);

  console.log('Search Query', searchQuery);

  const { data, isFetching, fetchNextPage, error, hasNextPage, isError } =
    useFetchImages(searchQuery);

  const hasBeenSearched = Boolean(searchInput.current?.value);
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

  return (
    <>
      <NavBar searchInput={searchInput} setSearchQuery={setSearchQuery} />

      {isError && (
        <Message
          message={`The images cannot be fetched at the moment. \n Please check the provided URL. \n ${error.message}  ❌ \n`}
        />
      )}

      {isFetching && (
        <div className='text-center'>
          <Message message='Fetching those images, you have requested' />
          <Loader />
        </div>
      )}

      {!hasBeenSearched && !isError && !isFetching ? (
        <Message message='Unleash this application by searching for images! 🔎' />
      ) : (
        <InfiniteScroll
          dataLength={dataLength}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={
            <div className='text-center'>
              <Loader />
            </div>
          }
          endMessage={
            !isFetching &&
            !isError && (
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            )
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
      )}
    </>
  );
};

export default Home;
