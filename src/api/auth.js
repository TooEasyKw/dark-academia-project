import instance from "./index";
import { storeToken } from "./storage";

const getBooks = async () => {
  try {
    const { data } = await instance.get("/books");
    return data;
  } catch (error) {
    console.error("Failed to fetch books", error);
    throw error;
  }
};

const getBookById = async (bookId) => {
  try {
    const { data } = await instance.get(`/books/${bookId}`);
    return data;
  } catch (error) {
    console.error("Failed to fetch book", error);
    throw error;
  }
};

const createBook = async (bookInfo) => {
  try {
    const { data } = await instance.post("/books", bookInfo);
    return data;
  } catch (error) {
    console.error("Failed to create book", error);
    throw error;
  }
};

const updateBook = async (bookId, bookInfo) => {
  try {
    const { data } = await instance.put(`/books/${bookId}`, bookInfo);
    return data;
  } catch (error) {
    console.error("Failed to update book", error);
    throw error;
  }
};

const deleteBook = async (bookId) => {
  try {
    const { data } = await instance.delete(`/books/${bookId}`);
    return data;
  } catch (error) {
    console.error("Failed to delete book", error);
    throw error;
  }
};

const login = async (username, password) => {
  try {
    const { data } = await instance.post("/auth/login", {
      username,
      password,
    });
    if (data.token) {
      storeToken(data.token);
    }
    return data;
  } catch (error) {
    console.error("Failed to login", error);
    throw error;
  }
};

const register = async (userInfo) => {
  try {
    const { data } = await instance.post("/auth/signup", userInfo);
    if (data.token) {
      storeToken(data.token);
    }
    return data;
  } catch (error) {
    console.error("Failed to register", error);
    throw error;
  }
};

export {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  login,
  register,
};
