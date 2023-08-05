import axios from 'axios';
import { FetchedImageType } from '../hooks/useFetchImages';

export type FetchedDataType = {
  total: number;
  total_pages: number;
  results: FetchedImageType[];
};

//from .env file, access key can be imported using import.meta.env.VITE_ACCESS_KEY
//for now, implmenting the access key by providing directly within the file

const ACCESS_KEY = 'DIXBzQZ6CNbwVFFaZVQgC-6FxHePOa-BZ8yBJM50g-U';

export const axiosInstance = axios.create({
  baseURL: 'https://api.unsplash.com/search/photos',
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});
