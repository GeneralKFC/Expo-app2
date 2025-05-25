//track the searches made by user
import { Client, Databases, ID, Query } from "react-native-appwrite";
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);
export const updateSearchCount = async (query: string, movie: any) => {
  //check if a record of that search has already been stored
  //id document found, increment the search count field
  // if no document is found,
  // create a new document in appWrite database->1
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);
    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          Count: Number(existingMovie.Count) + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        Count: 1,
        Title: movie.title,
        Poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};
export const getTrendingMovies = async (): Promise<any> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("Count"),
    ]);
    return result.documents as unknown as any;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
