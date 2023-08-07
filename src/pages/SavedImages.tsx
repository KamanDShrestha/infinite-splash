import { useNavigate } from 'react-router-dom';
import SavedImageGrid from '../components/SavedImageGrid';
import { FaHome } from 'react-icons/fa';
import Message from '../components/Message';

//This component acts as a page for viewing all the saved images
const SavedImages = () => {
  // Getting all the keys in localStorage, saved through Save button on Home screen
  const savedImagesQueries = Object.keys(localStorage).filter((key) =>
    key.startsWith('saved')
  );
  const navigate = useNavigate();
  return (
    <div className='p-5'>
      {/* For navigating back to Home screen */}
      <span
        onClick={() => navigate(-1)}
        className=' flex items-center gap-4 text-xl font-semibold  inset-0 w-[100%] '
      >
        <span className='inline-block'>
          <FaHome />
        </span>
        <span className='transition-all duration-500 ease-in-out hover:font-bold hover:cursor-pointer hover:underline hover:scale-105'>
          Home
        </span>
      </span>

      {/* For viewing all the saved images from the localStorage */}
      <h1 className='px-8 mt-4 text-3xl font-bold underline transition-all sm:text-4xl max-[320px]:text-2xl'>
        Saved Images
      </h1>
      {/* Providing a message if there're no saved images */}
      {savedImagesQueries.length === 0 ? (
        <Message message='You have not saved any images. You can search for different images in the home page.' />
      ) : (
        <div className='px-2 sm:px-10'>
          {savedImagesQueries.map((query: string) => (
            <SavedImageGrid savedQuery={query} key={query} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedImages;
