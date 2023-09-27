import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { fetchScreenshots } from '../useScreenshotList';


// Mocking axios for HTTP requests
const mock = new MockAdapter(axios);

describe('fetchScreenshots function', () => {
    it('fetches screenshots successfully', async () => {
        const mockData = {
            data: {
                getScreenshots: {
                    totalCount: 1,
                    screenshots: [{
                        id: 1,
                        kidId: 123,
                        kidName: 'John',
                        thumbnailUrl: 'http://example.com',
                        createdAt: '2023-01-01T12:00:00Z'
                    }]
                }
            }
        };

        mock.onPost('http://localhost:4000/graphql').reply(200, mockData);

        const result = await fetchScreenshots(1, 10);
        expect(result).toEqual(mockData.data.getScreenshots);
    });

    it('handles network errors', async () => {
        mock.onPost('http://localhost:4000/graphql').networkError();

        await expect(fetchScreenshots(1, 10)).rejects.toThrow('Network Error');
    });

    it('handles server errors', async () => {
        mock.onPost('http://localhost:4000/graphql').reply(500);

        await expect(fetchScreenshots(1, 10)).rejects.toThrow('Request failed with status code 500');
    });
});


