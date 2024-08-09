import React, { useState } from 'react';
import { FetchedImageType } from '../hooks/useFetchImages';
import { toast } from 'react-hot-toast';
import saveToLocalStorage from '../helpers/saveToLocalStorage';
import LoadingSpinner from './LoadingSpinner';

type Props = {
  image: FetchedImageType;
  usedSearchQuery?: string;
  savedImages?: React.MutableRefObject<FetchedImageType[]>;
};

// This component is used for providing a container to the fetched and saved images
// if savedImages and used
const ImageCard = ({ image, usedSearchQuery, savedImages }: Props) => {
  const [isDownloading, setIsDownloading] = useState(false);

  // This function is used for saving the images to localStorage
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
          saveToLocalStorage(savedImages, image, usedSearchQuery!);
        }
      } else {
        saveToLocalStorage(savedImages, image, usedSearchQuery!);
      }
    }
  }

  function downloadImage() {
    setIsDownloading(() => true);
    // using fetch API to get the response as blob and then using download attribute of anchor tag to download the image after it's been appended to the body, clicked and then removed accordingly
    fetch(image.urls.raw)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = image.description ?? image.id.toString();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsDownloading(() => false);
      })
      .catch((error) => {
        console.error(error);
        setIsDownloading(false);
      });
  }

  return (
    // container for the images
    <div
      className='relative flex flex-col items-center justify-center overflow-hidden transition-all duration-300 ease-in-out rounded-md shadow-lg hover:scale-105'
      key={image.id}
    >
      <img src={image.urls.small} className='w-[100%] h-[100%] peer' />
      <div className='absolute bottom-0 hidden peer-hover:block w-[100%] text-sm  backdrop-blur-lg bg-white/50  hover:block transition-opacity duration-500 ease-in-out'>
        <div className='flex items-center justify-between px-5 py-1 '>
          <div className=' overflow-hidden whitespace-nowrap mr-[70px]text-left  text-stone-950  text-ellipsis '>
            {image.description ?? 'This photo carries a tale too.'}
          </div>

          {/* providing the Save button only if useRef variable is provided for Home screen */}
          {savedImages && (
            <button
              className='px-3 py-1 bg-stone-950 rounded-xl hover:cursor-pointer text-stone-100 '
              onClick={() => saveImage(image)}
            >
              Save
            </button>
          )}
          <button
            className='px-3 py-1 bg-stone-950 rounded-xl hover:cursor-pointer text-stone-100 '
            onClick={() => downloadImage()}
          >
            {isDownloading ? <LoadingSpinner /> : 'Download'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
