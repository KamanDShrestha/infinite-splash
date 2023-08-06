import { ReactNode } from 'react';
// import { SimpleGrid } from '@chakra-ui/react';
type Props = {
  children: ReactNode;
};

const ImageGrid = ({ children }: Props) => {
  return (
    <div className='grid grid-cols-1 gap-6 p-6 my-4 sm:grid-cols-2 md:grid-cols-3'>
      {children}
    </div>
  );
};

export default ImageGrid;
