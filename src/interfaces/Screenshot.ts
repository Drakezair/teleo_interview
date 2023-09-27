export interface Screenshot {
  id: number;
  kidId: number;
  kidName: string;
  thumbnailUrl: string;
  createdAt: string;
}

export interface PaginatedResponse {
  totalCount: number;
  screenshots: Screenshot[];
}