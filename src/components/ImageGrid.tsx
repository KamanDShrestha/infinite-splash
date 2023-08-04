import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const ImageGrid = ({ children }: Props) => {
  return (
    <div className='grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 md:grid-cols-3 '>
      {children}
    </div>
  );
};

export default ImageGrid;
