import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitterX,
  BsTiktok,
  BsYoutube,
} from "react-icons/bs";

const Footer = () => {
  return (
    <div className="mt-4 flex flex-col space-y-1">
      <div className="border-4 border-[#FF3B30] text-justify p-2 rounded-md">
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

      <div className="border-4 border-[#FF3B30] p-2 rounded-md flex flex-col items-center justify-center">
        <div className="w-full grid grid-cols-3 gap-x-2">
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

      <p className="text-center m-2">
        © 2024 Andrés López, todos los derechos reservados.
      </p>
    </div>
  );
};

export default Footer;
