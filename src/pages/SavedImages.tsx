import { useNavigate } from 'react-router-dom';
import SavedImageGrid from '../components/SavedImageGrid';
import { FaHome } from 'react-icons/fa';
import Message from '../components/Message';

const SavedImages = () => {
  const savedImagesQueries = Object.keys(localStorage).filter((key) =>
    key.startsWith('saved')
  );
  const navigate = useNavigate();
  return (
    <div className='p-5'>
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

      <h1 className='px-8 mt-4 text-4xl font-bold underline'>Saved Images</h1>
      {savedImagesQueries.length === 0 ? (
        <Message message='You have not saved any images. You can search for different images in the home page.' />
      ) : (
        <div className='px-10'>
          {savedImagesQueries.map((query: string) => (
            <SavedImageGrid savedQuery={query} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedImages;
