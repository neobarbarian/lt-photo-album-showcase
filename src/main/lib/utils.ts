import { Photo } from '../../models/photo';
import { SearchFilter } from '../../models/search-filter';

export function formatSearchAsQueryStrings(searchFilter: SearchFilter): string {
  const queryStrings: string[] = [];

  Object.keys(searchFilter).forEach((key) => {
    if (key !== 'title') {
      queryStrings.push(`${key}=${searchFilter[key]}`);
    }
  });

  return `https://jsonplaceholder.typicode.com/photos${
    queryStrings.length > 0 ? '?' : ''
  }${queryStrings.join('&')}`;
}

export async function fetchAlbumSearchResults(
  queryStrings: string,
  searchFilter: SearchFilter,
): Promise<Photo[]> {
  const results: Photo[] = [];
  try {
    const album = await fetch(queryStrings);
    const json = await album.json();
    results.push(
      ...(searchFilter.title
        ? json.filter((item: any) => item.title.includes(searchFilter.title))
        : json),
    );
  } catch (error) {
    // TODO: set up module for logging errors
  }
  return results;
}
