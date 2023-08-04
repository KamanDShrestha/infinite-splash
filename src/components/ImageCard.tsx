import React from 'react';
import { FetchedImageType } from '../hooks/useFetchImages';

type Props = {
  image: FetchedImageType;
  usedSearchQuery?: string;
  savedImages?: React.MutableRefObject<FetchedImageType[]>;
};

// type SavedLocalStorage = {
//   images: FetchedImageType[];
// };

const ImageCard = ({ image, usedSearchQuery, savedImages }: Props) => {
  // const savedImages = useRef({ images: [] } as SavedLocalStorage);
  function saveImage(image: FetchedImageType) {
    if (savedImages) {
      console.log(savedImages);
      console.log(savedImages.current);

      if (Object.keys(localStorage).includes(`saved-${usedSearchQuery}`)) {
        const alreadySavedImages = JSON.parse(
          localStorage.getItem(`saved-${usedSearchQuery}`)!
        );
        const alreadySavedImage = alreadySavedImages.find(
          (savedImage: FetchedImageType) => savedImage.id === image.id
        );

        if (alreadySavedImage) {
          //add a toast here
          return;
        } else {
          savedImages.current = [...savedImages.current, image];
          localStorage.setItem(
            `saved-${usedSearchQuery}`,
            JSON.stringify(savedImages.current)
          );
        }
      } else {
        savedImages.current = [...savedImages.current, image];
        localStorage.setItem(
          `saved-${usedSearchQuery}`,
          JSON.stringify(savedImages.current)
        );
      }

      console.log(typeof savedImages.current);

      console.log(savedImages.current);
    }
  }

  return (
    <div className='relative flex items-center justify-center'>
      <img src={image.urls.small} className='w-[100%] h-[100%]' />
      {savedImages && (
        <button
          className='absolute px-3 py-1 bottom-2 right-4 bg-slate-500 rounded-xl'
          onClick={() => saveImage(image)}
        >
          Save
        </button>
      )}
    </div>
  );
};

export default ImageCard;
