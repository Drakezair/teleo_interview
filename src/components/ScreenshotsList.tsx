// ScreenshotsList.tsx
import React, { useState } from 'react';
import { useScreenshotsList } from '../hooks';

const ScreenshotsList: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useScreenshotsList(page, limit);
  const totalPages = Math.ceil((data?.totalCount ?? 0) / limit) || 1;


  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !data) {
    return <p>Error loading data.</p>;
  }

  return (
    <div>
      {data.screenshots.map(screenshot => (
        <div key={screenshot.id}>
          <img src={screenshot.thumbnailUrl} alt={`Screenshot from ${screenshot.createdAt}`} />
          <p>{screenshot.kidName}</p>
          <p>{new Date(screenshot.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
      <div>
        <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>Previous</button>
        <span>Page: {page} of {totalPages}</span>
        <button onClick={() => setPage(prev => prev + 1)} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default ScreenshotsList;
