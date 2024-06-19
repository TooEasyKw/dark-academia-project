import React, { useState, useEffect } from "react";
import { createBook, updateBook, deleteBook, getBooks } from "../api/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modify = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookInfo, setBookInfo] = useState({
    title: "",
    author: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      toast.error("Failed to fetch books");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookInfo({ ...bookInfo, [name]: value });
  };

  const handleCreateBook = async () => {
    const newBookInfo = { ...bookInfo };
    if (!newBookInfo.price) delete newBookInfo.price;
    if (!newBookInfo.image) delete newBookInfo.image;

    try {
      const newBook = await createBook(newBookInfo);
      setBooks([...books, newBook]);
      toast.success("Book created successfully");
      setBookInfo({
        title: "",
        author: "",
        price: "",
        image: "",
      });
    } catch (error) {
      toast.error("Failed to create book");
    }
  };

  const handleUpdateBook = async () => {
    if (!selectedBook) return;
    const updatedBookInfo = { ...bookInfo };
    if (!updatedBookInfo.price) delete updatedBookInfo.price;
    if (!updatedBookInfo.image) delete updatedBookInfo.image;

    try {
      await updateBook(selectedBook._id, updatedBookInfo);
      fetchBooks();
      toast.success("Book updated successfully");
      setSelectedBook(null);
      setBookInfo({
        title: "",
        author: "",
        price: "",
        image: "",
      });
    } catch (error) {
      toast.error("Failed to update book");
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await deleteBook(bookId);
      setBooks(books.filter((book) => book._id !== bookId));
      toast.success("Book deleted successfully");
      setSelectedBook(null);
      setBookInfo({
        title: "",
        author: "",
        price: "",
        image: "",
      });
    } catch (error) {
      toast.error("Failed to delete book");
    }
  };

  const selectBook = (book) => {
    setSelectedBook(book);
    setBookInfo({
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image,
    });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-charcoal-gray text-white font-serif pt-16">
      <main className="w-full max-w-7xl text-center flex-grow flex flex-col justify-start items-center p-6">
        <h2 className="text-5xl font-serif mb-5">Modify Books</h2>
        <p className="text-xl mb-5">
          Create, update, or delete books from the library collection.
        </p>

        <div className="flex flex-wrap justify-center space-x-6 mb-6">
          <div className="w-full sm:w-1/2 lg:w-1/3 bg-forest-green p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-2xl mb-3">Create Book</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateBook();
              }}
            >
              <input
                type="text"
                name="title"
                value={bookInfo.title}
                onChange={handleInputChange}
                placeholder="Title"
                required
                className="w-full p-2 mb-3 rounded-md bg-charcoal-gray text-white"
              />
              <input
                type="text"
                name="author"
                value={bookInfo.author}
                onChange={handleInputChange}
                placeholder="Author"
                required
                className="w-full p-2 mb-3 rounded-md bg-charcoal-gray text-white"
              />
              <input
                type="text"
                name="price"
                value={bookInfo.price}
                onChange={handleInputChange}
                placeholder="Price (KD)"
                className="w-full p-2 mb-3 rounded-md bg-charcoal-gray text-white"
              />
              <input
                type="text"
                name="image"
                value={bookInfo.image}
                onChange={handleInputChange}
                placeholder="Image URL"
                className="w-full p-2 mb-3 rounded-md bg-charcoal-gray text-white"
              />
              <button
                type="submit"
                className="bg-brown-600 text-white px-4 py-2 rounded-md hover:bg-brown-700"
              >
                Create
              </button>
            </form>
          </div>

          <div className="w-full sm:w-1/2 lg:w-1/3 bg-forest-green p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-2xl mb-3">Update/Delete Book</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateBook();
              }}
            >
              <input
                type="text"
                name="title"
                value={selectedBook ? bookInfo.title : ""}
                onChange={handleInputChange}
                placeholder="Title"
                required
                className="w-full p-2 mb-3 rounded-md bg-charcoal-gray text-white"
              />
              <input
                type="text"
                name="author"
                value={selectedBook ? bookInfo.author : ""}
                onChange={handleInputChange}
                placeholder="Author"
                required
                className="w-full p-2 mb-3 rounded-md bg-charcoal-gray text-white"
              />
              <input
                type="text"
                name="price"
                value={selectedBook ? bookInfo.price : ""}
                onChange={handleInputChange}
                placeholder="Price (KD)"
                className="w-full p-2 mb-3 rounded-md bg-charcoal-gray text-white"
              />
              <input
                type="text"
                name="image"
                value={selectedBook ? bookInfo.image : ""}
                onChange={handleInputChange}
                placeholder="Image URL"
                className="w-full p-2 mb-3 rounded-md bg-charcoal-gray text-white"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-brown-600 text-white px-4 py-2 rounded-md hover:bg-brown-700"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteBook(selectedBook._id)}
                  className="bg-brown-600 text-white px-4 py-2 rounded-md hover:bg-brown-700"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-forest-green p-6 rounded-lg shadow-md cursor-pointer"
              onClick={() => selectBook(book)}
            >
              <img
                src={
                  book.image ||
                  "https://marketplace.canva.com/EAFPHUaBrFc/1/0/1003w/canva-black-and-white-modern-alone-story-book-cover-QHBKwQnsgzs.jpg"
                }
                alt={book.title}
                className="h-48 w-full object-cover rounded-md mb-3"
              />
              <h3 className="text-2xl mb-3">{book.title}</h3>
              <p className="text-lg mb-2">{book.author}</p>
              <p className="text-lg mb-2">
                {book.price ? `${book.price} KD` : "5 KD"}
              </p>
            </div>
          ))}
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Modify;
