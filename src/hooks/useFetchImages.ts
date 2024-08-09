import { useInfiniteQuery } from '@tanstack/react-query';
import { axiosInstance } from '../services/apiInstance';

// Providing the type to the value fetched as images
export type FetchedImageType = {
  id: number;
  width: number;
  height: number;
  urls: { large: string; regular: string; raw: string; small: string };
  color: string | null;
  user: {
    username: string;
    name: string;
  };
  description: string | null;
};

//providing a type for the data that's been fetched through request
export type FetchedDataType = {
  total: number;
  total_pages: number;
  results: FetchedImageType[];
};

//This hook function is used for fetching the images using Unsplash API and providing functionality to load more data to existing one
const useFetchImages = (imageQuery: string) => {
  //using useInfiniteQuery hook to fetch data using API as well as loading more data to existing data set to provide a infinite scroll UI pattern
  const fetchedImages = useInfiniteQuery<FetchedDataType, Error>({
    // providing a key for cached data
    queryKey: ['images', imageQuery],

    // providing function along with parameters while fetching the images
    queryFn: ({ pageParam = 1 }) =>
      axiosInstance
        .get<FetchedDataType>('/', {
          params: {
            query: imageQuery,
            page: pageParam,
            orientation: 'landscape',
            per_page: 12,
          },
        })
        .then((response) => response.data),
    staleTime: 24 * 60 * 60 * 1000, //fresh for 24 hr
    enabled:
      imageQuery.trim() !== '' &&
      imageQuery !== undefined &&
      imageQuery !== null,

    // for checking whether there's a next page to fetch or not
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.total_pages > allPages.length
        ? allPages.length + 1
        : undefined;
    },
  });
  return fetchedImages;
};

export default useFetchImages;
