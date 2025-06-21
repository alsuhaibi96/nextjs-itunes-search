export interface ItunesRawResult {
    collectionId:       number;
    collectionName:     string;
    artistName:         string;
    feedUrl?:           string;
    artworkUrl100?:     string;
  }
  
  export interface ItunesSearchResponse {
    resultCount: number;
    results: ItunesRawResult[];
  }