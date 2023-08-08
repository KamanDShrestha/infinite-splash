import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

//THis component is used for providing a grid layout to fetched images
const ImageGrid = ({ children }: Props) => {
  return (
    <div className='grid grid-cols-1 gap-6 p-6 my-4 max-[640px]:grid-cols-1 max-[900px]:grid-cols-2 min-[900px]:grid-cols-3'>
      {children}
    </div>
  );
};

export default ImageGrid;
