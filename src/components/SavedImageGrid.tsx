import { FetchedImageType } from '../hooks/useFetchImages';
import ImageCard from './ImageCard';

type Props = {
  savedQuery: string;
};

//This component provides a grid layout for displaying all the saved images from localStorage
const SavedImageGrid = ({ savedQuery }: Props) => {
  //Getting all the saved images for a particular search query provided as key
  const savedImages = JSON.parse(
    localStorage.getItem(savedQuery)!
  ) as FetchedImageType[];

  //Getting the provided query in the search input field from the saved key
  const providedQuery = savedQuery.split('-')[1];
  return (
    // Providing a header to the grid
    <div className='p-5 my-10 rounded-lg shadow-lg bg-stone-100 max-[320px]:p-2 transition-all'>
      <h1 className='text-xl font-semibold underline max-[320px]:text-sm transition-all'>
        Saved images for '{providedQuery}'
      </h1>

      {/* For providing all the saved images from localStorage for a particular key */}
      <div className='grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 max md:grid-cols-3 max-[420px]:p-2'>
        {savedImages?.map((savedImage) => (
          <ImageCard image={savedImage} key={savedImage.id} />
        ))}
      </div>
    </div>
  );
};

export default SavedImageGrid;
