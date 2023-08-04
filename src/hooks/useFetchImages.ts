import { useInfiniteQuery } from '@tanstack/react-query';
import { axiosInstance } from '../services/apiInstance';

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
};

type FetchedDataType = {
  total: number;
  total_pages: number;
  results: FetchedImageType[];
};

const useFetchImages = (imageQuery: string) => {
  const fetchedImages = useInfiniteQuery<FetchedDataType, Error>({
    queryKey: ['images', imageQuery],
    queryFn: ({ pageParam = 1 }) =>
      axiosInstance
        .get<FetchedDataType>('/', {
          params: {
            query: imageQuery,
            page: pageParam,
            orientation: 'landscape',
          },
        })
        .then((response) => response.data),
    staleTime: 24 * 60 * 60 * 1000, //fresh for 24 hr
    getNextPageParam: (lastPage, allPages) => {
      console.log(lastPage.total_pages, allPages.length);
      console.log(lastPage.total_pages > allPages.length);
      return lastPage.total_pages > allPages.length
        ? allPages.length + 1
        : undefined;
    },
  });
  return fetchedImages;
};
// const useFetchImages = (imageQuery: string) => {
//   const fetchedImages = useQuery<FetchedDataType>({
//     queryKey: ['images', imageQuery],
//     queryFn: () =>
//       axiosInstance
//         .get<FetchedDataType>('/', {
//           params: {
//             query: imageQuery,
//             page: 1000,
//           },
//         })
//         .then((response) => response.data),
//   });
//   return fetchedImages;
// };

export default useFetchImages;
