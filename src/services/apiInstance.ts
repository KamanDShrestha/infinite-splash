import axios from 'axios';
import { FetchedImageType } from '../hooks/useFetchImages';

export type FetchedDataType = {
  total: number;
  total_pages: number;
  results: FetchedImageType[];
};

export const axiosInstance = axios.create({
  baseURL: 'https://api.unsplash.com/search/photos',
  headers: {
    Authorization: `Client-ID ${import.meta.env.VITE_ACCESS_KEY}`,
  },
});
