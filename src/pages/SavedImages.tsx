import { useNavigate } from 'react-router-dom';
import SavedImageGrid from '../components/SavedImageGrid';

const SavedImages = () => {
  const savedImagesQueries = Object.keys(localStorage).filter((key) =>
    key.startsWith('saved')
  );
  const navigate = useNavigate();
  return (
    <>
      <span onClick={() => navigate(-1)} className='hover:cursor-pointer'>
        {'<'} Home
      </span>
      <div>
        {savedImagesQueries.map((query: string) => (
          <SavedImageGrid savedQuery={query} />
        ))}
      </div>
    </>
  );
};

export default SavedImages;
