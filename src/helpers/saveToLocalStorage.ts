import { FetchedImageType } from '../hooks/useFetchImages';
import { toast } from 'react-hot-toast';

function saveToLocalStorage(
  savedImages: React.MutableRefObject<FetchedImageType[]>,
  image: FetchedImageType,
  usedSearchQuery: string
) {
  savedImages.current = [...savedImages.current, image];
  localStorage.setItem(
    `saved-${usedSearchQuery}`,
    JSON.stringify(savedImages.current)
  );
  toast.success('The image has been saved.');
}

export default saveToLocalStorage;
