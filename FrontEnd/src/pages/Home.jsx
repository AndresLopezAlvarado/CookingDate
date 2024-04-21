import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToggle } from "../contexts/ToggleContext";
import LoginModal from "../components/login/LoginModal.jsx";
import RegisterModal from "../components/register/RegisterModal.jsx";
import CommentsCarousel from "../components/CommentsCarousel.jsx";
import fetchData from "../constants/comments.js";

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const { isOpen, toggleModal } = useToggle();
  const [comments, setComments] = useState(null);

  useEffect(() => {
    async function loadComments() {
      try {
        var fetchComments = await fetchData();
        fetchComments = fetchComments.slice(0, 10);
        setComments(fetchComments);
      } catch (error) {
        console.error("Error en la llamada:", error);
      }
    }

    loadComments();
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <div className="h-screen mt-20 flex flex-col justify-center items-center text-center space-y-3">
          <h1 className="bg-[#FF3B30] text-[#FFCC00] text-3xl font-bold p-2 rounded-md">
            Bienvenid@ {user.username}
          </h1>

          <img
            src={
              user.profilePicture
                ? user.profilePicture.url
                : "/noProfilePhoto.png"
            }
            className="w-5/6 rounded-full"
          />

          <h2 className="font-bold">
            Come on,{" "}
            <Link to="/people" className="text-[#FFCC00]">
              find a date!
            </Link>
          </h2>
        </div>
      ) : (
        <>
          <div className="h-screen mt-20 flex flex-col justify-center items-center space-y-2">
            <div className="w-5/6 flex flex-col items-center justify-center text-center">
              <p className="font-bold justify-center">
                Do you want to find a cooking date?{" "}
                <Link id="openSignIn" onClick={toggleModal} className="text-[#FFCC00]">
                  Sign In!
                </Link>
              </p>

              <img className="w-5/6" src="/panOnStove.gif" alt="logoHome" />
            </div>

            {comments ? (
              <>
                <h1 className="bg-[#FF3B30] text-[#FFCC00] text-3xl font-bold p-2 rounded-md">
                  Comments
                </h1>

                <div className="w-full">
                  <CommentsCarousel comments={comments} />
                </div>
              </>
            ) : null}
          </div>

          <LoginModal isOpen={isOpen.login} toggleModal={toggleModal} />

          <RegisterModal isOpen={isOpen.register} toggleModal={toggleModal} />
        </>
      )}
    </>
  );
};

export default Home;
