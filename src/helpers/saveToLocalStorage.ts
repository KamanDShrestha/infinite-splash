import { FetchedImageType } from '../hooks/useFetchImages';
import { toast } from 'react-hot-toast';

//This function is used for saving all the images for current search query in a useRef variable and setting them to localStorage with a appropriate key
function saveToLocalStorage(
  savedImages: React.MutableRefObject<FetchedImageType[]>,
  image: FetchedImageType,
  usedSearchQuery: string
) {
  //Saving all the images for the current search query in the useRef variable
  savedImages.current = [...savedImages.current, image];

  //Setting all the current images in useRef variable to the localStorage with the key as saved-(search query)
  localStorage.setItem(
    `saved-${usedSearchQuery}`,
    JSON.stringify(savedImages.current)
  );

  //Providing a successful notification on saving to localStorage
  toast.success('The image has been saved.');
}

export default saveToLocalStorage;
