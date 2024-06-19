import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bigPicture from "../Pics/dark-academia-final.jpg";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-charcoal-gray text-white font-serif">
      <main className="w-full max-w-7xl text-center flex flex-col justify-center items-center">
        <h2 className="text-5xl font-serif mb-5">Welcome to Aya's Library</h2>
        <p className="text-2xl mb-5">
          Discover and explore the world of books.
        </p>
        <div className="relative mb-5 w-full max-w-4xl">
          <img
            src={bigPicture}
            alt="Library"
            className="w-full max-h-80 object-contain mx-auto rounded-lg"
          />
        </div>
        <div className="flex justify-around mb-5 space-x-4 w-full">
          <div className="w-1/3 bg-forest-green p-6 rounded-lg shadow-md">
            <h3 className="text-2xl mb-3">Book Collection</h3>
            <p>Browse through an extensive collection of books.</p>
          </div>
          <div className="w-1/3 bg-forest-green p-6 rounded-lg shadow-md">
            <h3 className="text-2xl mb-3">Search</h3>
            <p>Find your favorite books easily.</p>
          </div>
          <div className="w-1/3 bg-forest-green p-6 rounded-lg shadow-md">
            <h3 className="text-2xl mb-3">Modify</h3>
            <p>Update the library with new additions.</p>
          </div>
        </div>
      </main>

      <div className="text-center text-gray-400 text-sm mt-2">
        © 2024 Aya's Library. All rights reserved.
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;
