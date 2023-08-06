import React, { useEffect, useRef } from 'react';
import useFetchImages, { FetchedImageType } from '../hooks/useFetchImages';
import Loader from './Loader';
import Message from './Message';
import ImageCard from './ImageCard';
import ImageGrid from './ImageGrid';
import InfiniteScroll from 'react-infinite-scroller';

type Props = {
  searchInput: React.RefObject<HTMLInputElement>;
  searchQuery: string;
};

const FetchedImages = ({ searchInput, searchQuery }: Props) => {
  const { data, isFetching, fetchNextPage, error, hasNextPage, isError } =
    useFetchImages(searchQuery);

  const hasBeenSearched = Boolean(searchInput.current?.value);
  const fetchedDataLength =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  const savedImages = useRef([] as FetchedImageType[]);

  useEffect(() => {
    savedImages.current = [];
  }, [searchQuery]);

  return (
    <>
      {isError && (
        <Message
          message={`The images cannot be fetched at the moment. Please check the provided URL. ${error.message}  ❌ `}
        />
      )}

      {isFetching && searchQuery && (
        <div className='text-center'>
          <Message message='Fetching those images, you have requested' />
          <Loader />
        </div>
      )}

      {!hasBeenSearched && !isError && !isFetching ? (
        <Message message='Unleash this application by searching for images! 🔎' />
      ) : (
        <InfiniteScroll
          loadMore={() => fetchNextPage()}
          hasMore={!!hasNextPage}
          loader={
            <div className='text-center'>
              <Loader />
            </div>
          }
          initialLoad={false}
        >
          <ImageGrid>
            {data?.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page.results.map((image) => (
                  <ImageCard
                    image={image}
                    usedSearchQuery={searchQuery}
                    savedImages={savedImages}
                    key={image.id}
                  />
                ))}
              </React.Fragment>
            ))}
          </ImageGrid>
        </InfiniteScroll>
      )}

      {!hasNextPage &&
        !isFetching &&
        !isError &&
        searchQuery &&
        fetchedDataLength !== 0 && (
          <p style={{ textAlign: 'center' }}>
            <b>Yay! 🎊 You have seen it all 👍🏻</b>
          </p>
        )}

      {!fetchedDataLength && searchQuery && !isFetching && (
        <Message message='No images are found based on your input. Please double check your provided query.' />
      )}
    </>
  );
};

export default FetchedImages;
