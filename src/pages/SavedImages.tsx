import React from 'react';
import SavedImageGrid from '../components/SavedImageGrid';

const SavedImages = () => {
  const savedImagesQueries = Object.keys(localStorage).filter((key) =>
    key.startsWith('saved')
  );

  return (
    <div>
      {savedImagesQueries.map((query: string) => (
        <SavedImageGrid savedQuery={query} />
      ))}
    </div>
  );
};

export default SavedImages;
