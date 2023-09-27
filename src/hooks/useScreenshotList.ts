// useScreenshots.ts
import { useQuery } from 'react-query';
import axios from 'axios';
import { PaginatedResponse } from '../interfaces/Screenshot';


const fetchScreenshots = async (page: number, limit: number): Promise<PaginatedResponse> => {
  const query = `
    query GetPaginatedScreenshots($page: Int!, $limit: Int!) {
      getScreenshots(page: $page, limit: $limit) {
        totalCount
        screenshots {
          id
          kidId
          kidName
          thumbnailUrl
          createdAt
        }
      }
    }
  `;

  const response = await axios.post('http://localhost:4000/graphql', { 
    query, 
    variables: { page, limit }
  });
  
  return response.data.data.getScreenshots;
};

export const useScreenshotsList = (page: number, limit: number) => {
  return useQuery<PaginatedResponse, Error>(['screenshots', page, limit], () => fetchScreenshots(page, limit));
};
