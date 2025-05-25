export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};
export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie`;

  const res = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });
  if (!res.ok) {
    throw new Error("Failed to fetch movie");
  }
  const data = await res.json();
  return data.results;
};
export const fetchMovieDetails = async (movieId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch movie details");
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
/*const url =
  "https://api.themoviedb.org/3/account/22006498/favorite/movies?language=en-US&page=1&sort_by=created_at.asc";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzBlNWQwNDY2ZmFkNGVjMDIzYTBjNDBkMjEwMmUwMSIsIm5iZiI6MTc0NzA2NTAzOC44MjgsInN1YiI6IjY4MjIxOGNlZDY1MTQ5OTkwYmFkOTM4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.txnrJTFCsif0ILoRJOSujPyr_HmW3qdfQfle5RxdSz8",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error(err));*/
