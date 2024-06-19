import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getBooks } from "../api/auth";

const BookCollection = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        toast.error("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-charcoal-gray text-white font-serif">
      <main className="w-full max-w-7xl text-center flex-grow flex flex-col justify-center items-center p-6">
        <h2 className="text-5xl font-serif mb-5">Book Collection</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-forest-green p-6 rounded-lg shadow-md"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-48 w-full object-cover rounded-md mb-3"
                />
                <h3 className="text-2xl mb-3">{book.title}</h3>
                <p className="text-lg mb-2">{book.author}</p>
                <p className="text-lg mb-2">{book.price}</p>
                <p>{book.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <ToastContainer />
    </div>
  );
};

export default BookCollection;
