import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookCollection from "./pages/BookCollection";
import Search from "./pages/Search";
import Modify from "./pages/Modify";
import NotFoundPage from "./pages/NotFoundPage";
import { getToken } from "./api/storage";
import UserContext from "./context/UserContext";

const App = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (getToken()) setUser(true);
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {!user && (
          <>
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
          </>
        )}
        {user && (
          <>
            <Route path="/book-collection" element={<BookCollection />} />
            <Route path="/search" element={<Search />} />
            <Route path="/modify" element={<Modify />} />
          </>
        )}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
