import React, { useState } from "react";
import { getBookById } from "../api/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Search = () => {
  const [bookId, setBookId] = useState("");
  const [book, setBook] = useState(null);

  const handleInputChange = (e) => {
    setBookId(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const data = await getBookById(bookId);
      setBook(data);
    } catch (error) {
      toast.error("Failed to fetch book. Please check the ID and try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-charcoal-gray text-white font-serif pt-16">
      <main className="w-full max-w-7xl text-center flex-grow flex flex-col justify-start items-center p-6">
        <h2 className="text-5xl font-serif mb-5">Search Books</h2>
        <div className="w-full max-w-md mb-6 flex items-center">
          <input
            type="text"
            value={bookId}
            onChange={handleInputChange}
            placeholder="Enter Book ID"
            className="w-full p-2 rounded-l-md bg-charcoal-gray text-white border border-white"
          />
          <button
            onClick={handleSearch}
            className="bg-brown-600 text-white px-4 py-2 rounded-r-md hover:bg-brown-700 border border-white"
          >
            Search
          </button>
        </div>
        {book && (
          <div className="bg-forest-green p-6 rounded-lg shadow-md w-full max-w-md">
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
        )}
      </main>
      <ToastContainer />
    </div>
  );
};

export default Search;
