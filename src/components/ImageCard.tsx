import React from 'react';
import { FetchedImageType } from '../hooks/useFetchImages';
import { toast } from 'react-hot-toast';

type Props = {
  image: FetchedImageType;
  usedSearchQuery?: string;
  savedImages?: React.MutableRefObject<FetchedImageType[]>;
};

const ImageCard = ({ image, usedSearchQuery, savedImages }: Props) => {
  function saveImage(image: FetchedImageType) {
    if (savedImages) {
      if (Object.keys(localStorage).includes(`saved-${usedSearchQuery}`)) {
        savedImages.current = JSON.parse(
          localStorage.getItem(`saved-${usedSearchQuery}`)!
        );
        const alreadySavedImage = savedImages.current.find(
          (savedImage: FetchedImageType) => savedImage.id === image.id
        );

        if (alreadySavedImage) {
          toast.error('The image has already been saved.');
          return;
        } else {
          savedImages.current = [...savedImages.current, image];
          localStorage.setItem(
            `saved-${usedSearchQuery}`,
            JSON.stringify(savedImages.current)
          );
          toast.success('The image has been saved.');
        }
      } else {
        savedImages.current = [...savedImages.current, image];
        localStorage.setItem(
          `saved-${usedSearchQuery}`,
          JSON.stringify(savedImages.current)
        );
        toast.success('The image has been saved.');
      }
    }
  }

  return (
    <div className='relative flex flex-col items-center justify-center overflow-hidden transition-all duration-300 ease-in-out rounded-md shadow-lg hover:scale-105'>
      <img src={image.urls.small} className='w-[100%] h-[100%] peer' />
      <div className='absolute bottom-0 hidden peer-hover:block w-[100%] text-sm  backdrop-blur-lg bg-white/50  hover:block transition-opacity duration-500 ease-in-out'>
        <div className='flex items-center justify-between px-5 py-1 '>
          <div className=' overflow-hidden whitespace-nowrap mr-[70px]text-left  text-stone-950  text-ellipsis '>
            {image.description ?? 'This photo carries a tale too.'}
          </div>
          {savedImages && (
            <button
              className='px-3 py-1 bg-stone-950 rounded-xl hover:cursor-pointer text-stone-100 '
              onClick={() => saveImage(image)}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
