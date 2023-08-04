import React from 'react';
import { FetchedImageType } from '../hooks/useFetchImages';
import ImageCard from './ImageCard';

type Props = {
  savedQuery: string;
};

const SavedImageGrid = ({ savedQuery }: Props) => {
  const savedImages = JSON.parse(
    localStorage.getItem(savedQuery)!
  ) as FetchedImageType[];
  console.log(savedImages);
  const providedQuery = savedQuery.split('-')[1];
  return (
    <>
      <h1>Saved images for '{providedQuery}'</h1>
      <div className='grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 md:grid-cols-3'>
        {savedImages?.map((savedImage) => <ImageCard image={savedImage} />)}
      </div>
    </>
  );
};

export default SavedImageGrid;
