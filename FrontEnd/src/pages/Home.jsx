import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitterX,
  BsTiktok,
  BsYoutube,
} from "react-icons/bs";
import { useAuth } from "../contexts/AuthContext";
import LoginModal from "../components/login/LoginModal.jsx";
import RegisterModal from "../components/register/RegisterModal.jsx";
import CommentsCarousel from "../components/CommentsCarousel.jsx";
import fetchData from "../constants/comments.js";
import { VITE_FRONTEND_URL } from "../../config.js";

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [comments, setComments] = useState([]);

  const toggleModalLogin = () => {
    setIsOpenLogin(!isOpenLogin);
  };

  const toggleModalRegister = () => {
    setIsOpenRegister(!isOpenRegister);
  };

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

  console.log("El valor de VITE_FRONTEND_URL es: " + VITE_FRONTEND_URL);

  return (
    <>
      <div className="min-h-screen border-4 border-lime-900 mt-14 sm:mt-16 md:mt-20 lg:mt-28 mx-1 mb-1 rounded-md flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center justify-center text-center">
          {isAuthenticated ? (
            <>
              <p className="bg-lime-900 text-orange-400 text-3xl font-bold p-4 my-4 rounded-md">
                Bienvenido {user.username}
              </p>

              {user.image && (
                <img src={user.image.url} className="mb-4 rounded-full" />
              )}

              <p className=" bg-lime-900 text-lime-500 font-bold inline-block mb-4 p-4 justify-center rounded-md">
                Come on,{" "}
                <Link to="/people" className="text-orange-400">
                  find a date!
                </Link>
              </p>
            </>
          ) : (
            <>
              <img
                style={{ height: "400px", width: "500px" }}
                className="mb-4"
                src={`${
                  VITE_FRONTEND_URL === ""
                    ? "../src/assets/panOnStove.gif"
                    : VITE_FRONTEND_URL + "/src/assets/panOnStove.gif"
                }`}
                // src="../src/assets/panOnStove.gif"
                alt="position"
              />

              <p className=" bg-lime-900 text-lime-500 font-bold inline-block mb-4 p-4 justify-center rounded-md">
                Do you want to find a cooking date?{" "}
                <Link onClick={toggleModalLogin} className="text-orange-400">
                  Sign In!
                </Link>
              </p>
            </>
          )}

          <LoginModal
            isOpen={isOpenLogin}
            toggleModalLogin={toggleModalLogin}
            toggleModalRegister={toggleModalRegister}
          />

          <RegisterModal
            isOpen={isOpenRegister}
            toggleModalLogin={toggleModalLogin}
            toggleModalRegister={toggleModalRegister}
          />
        </div>
      </div>

      {comments ? (
        <div className="text-lime-900 border-4 border-lime-900 m-1 rounded-md flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl font-bold p-4">Comments</h1>

          <CommentsCarousel comments={comments} />
        </div>
      ) : null}

      <div className="text-lime-900 p-3 border-4 border-lime-900 m-1 rounded-md text-justify">
        <p>
          ¡Bienvenido a Cooking Date, la aplicación que une corazones a través
          de la cocina! ¿Estás cansado de las típicas citas aburridas? ¿Quieres
          darle un toque de sabor y diversión a tus encuentros románticos?
          Entonces Cooking Date es para ti. Imagina una experiencia única donde
          cocinar se convierte en el ingrediente principal para conectar con esa
          persona especial. Desde una cena íntima a una divertida competencia
          culinaria, Cooking Date te ofrece la oportunidad de crear recuerdos
          inolvidables mientras exploras el arte de cocinar juntos. Con nuestra
          amplia selección de recetas deliciosas y fáciles de seguir, nunca más
          tendrás que preocuparte por qué preparar en tu cita. Desde platos
          gourmet hasta comidas reconfortantes, tenemos opciones para todos los
          gustos y niveles de habilidad culinaria. Pero eso no es todo. Cooking
          Date te permite descubrir nuevas culturas a través de la comida,
          explorar sabores exóticos y compartir momentos de complicidad mientras
          preparas tus platos favoritos. ¿Y qué hay de las sorpresas? Con
          nuestra función de "Receta Aleatoria", podrás emocionarte con una
          nueva creación culinaria cada vez que inicies sesión, manteniendo la
          emoción y la espontaneidad en tus citas. ¿Listo para encontrar a tu
          pareja perfecta mientras cocinan juntos? ¡Únete a Cooking Date y deja
          que la magia de la cocina encienda la llama del amor! ¡Descarga
          Cooking Date ahora y prepárate para un festín de amor y sabor!
        </p>
      </div>

      <div className="text-lime-900 p-3 border-4 border-lime-900 m-1 rounded-md flex flex-col items-center justify-center">
        <div className="w-full grid grid-cols-3">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-2">Legal</h1>
            <Link>Privacidad</Link>
            <Link>Condiciones</Link>
            <Link>Politica de cookies</Link>
            <Link>Propiedad intelectual</Link>
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-2">Trabajo</h1>
            <Link>Portal de empleo</Link>
            <Link>Blog tecnológico</Link>
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-2">Redes sociales</h1>
            <div className="flex gap-x-3">
              <BsFacebook />
              <BsInstagram />
              <BsTwitterX />
              <BsTiktok />
              <BsYoutube />
            </div>
          </div>
        </div>
      </div>

      <p className="text-center mb-2">
        © 2024 Andrés López, todos los derechos reservados.
      </p>
    </>
  );
};

export default Home;
