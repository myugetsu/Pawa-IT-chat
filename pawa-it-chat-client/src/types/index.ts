export interface QueryResponse {
  response: string;
  history_id: string;
}

export interface HistoryItem {
  id: string;
  query: string;
  response: string;
  timestamp: string;
}
