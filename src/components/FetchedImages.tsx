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

// This component is used for providing fetched images onto UI along with infinite scroll capability
const FetchedImages = ({ searchInput, searchQuery }: Props) => {
  // for fetching the images using Unsplash API along with the functions to fetch next pages
  const { data, isFetching, fetchNextPage, error, hasNextPage, isError } =
    useFetchImages(searchQuery);

  // for checking if query is provided or not
  const hasBeenSearched = Boolean(searchInput.current?.value);

  //for getting the length of the data fetched from the request
  const fetchedDataLength =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  // useRef variable for storing the images for a particular search query
  const savedImages = useRef([] as FetchedImageType[]);

  // resetting the useRef variable with the change in search query
  useEffect(() => {
    savedImages.current = [];
  }, [searchQuery]);

  //providing a error message if there's a error
  if (isError) {
    return (
      <Message
        message={`The images cannot be fetched at the moment. Please check the provided URL. ${error.message}  ❌ `}
      />
    );
  }

  return (
    <>
      {/* providing a fetching message while the images are being fetched */}
      {isFetching && searchQuery && fetchedDataLength === 0 && (
        <div className='text-center'>
          <Message message='Fetching those images, you have requested' />
          <Loader />
        </div>
      )}

      {/* providing grid for fetched images with infinite scroll functionality */}
      {!hasBeenSearched && !isError && !isFetching ? (
        // providing a initial message if user hasnot provided a valid search query
        <Message message='Unleash this application by searching for images! 🔎' />
      ) : (
        // grid of fetched images with infinite scroll functionality through InfiniteScroll component
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
          {/* providing a grid for fetched images */}
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

      {/* providing a end message if no other pages are remained for fetching images */}
      {!hasNextPage &&
        !isFetching &&
        !isError &&
        searchQuery &&
        fetchedDataLength !== 0 && (
          <p style={{ textAlign: 'center' }}>
            <b>Yay! 🎊 You have seen it all 👍🏻</b>
          </p>
        )}

      {/* providing message if no images are present for display */}
      {!fetchedDataLength && searchQuery && !isFetching && !isError && (
        <Message message='No images are found based on your input. Please double check your provided query.' />
      )}
    </>
  );
};

export default FetchedImages;
