import { User, Post, Comment, Album, Photo, Todo } from "@/types/api";

export const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchData<T>(endpoint: string): Promise<T[]> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  return res.json();
}

export const api = {
  getPosts: () => fetchData<Post>("/posts"),
  getComments: () => fetchData<Comment>("/comments"),
  getAlbums: () => fetchData<Album>("/albums"),
  getPhotos: () => fetchData<Photo>("/photos"),
  getTodos: () => fetchData<Todo>("/todos"),
  getUsers: () => fetchData<User>("/users"),

  getPost: (id: number) =>
    fetchData<Post>(`/posts/${id}`).then((data) =>
      Array.isArray(data) ? data[0] : data,
    ),
  getUser: (id: number) =>
    fetchData<User>(`/users/${id}`).then((data) =>
      Array.isArray(data) ? data[0] : data,
    ),
  getAlbum: (id: number) =>
    fetchData<Album>(`/albums/${id}`).then((data) =>
      Array.isArray(data) ? data[0] : data,
    ),

  getPostsByUser: (userId: number) =>
    fetchData<Post>(`/posts?userId=${userId}`),
  getTodosByUser: (userId: number) =>
    fetchData<Todo>(`/todos?userId=${userId}`),
  getAlbumsByUser: (userId: number) =>
    fetchData<Album>(`/albums?userId=${userId}`),
  getCommentsByPost: (postId: number) =>
    fetchData<Comment>(`/comments?postId=${postId}`),
  getPhotosByAlbum: (albumId: number) =>
    fetchData<Photo>(`/photos?albumId=${albumId}`),
};
