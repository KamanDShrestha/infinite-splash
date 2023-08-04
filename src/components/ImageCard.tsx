import React, { useEffect } from 'react';
import { FetchedImageType } from '../hooks/useFetchImages';

type Props = {
  image: FetchedImageType;
};

const ImageCard = ({ image }: Props) => {
  useEffect(() => {}, []);

  return (
    <div className='relative flex items-center justify-center'>
      <img src={image.urls.small} className='w-[100%] h-[100%]' />
      <button className='absolute px-3 py-1 bottom-2 right-4 bg-slate-500 rounded-xl'>
        Save
      </button>
    </div>
  );
};

export default ImageCard;
