import { Carousel } from "flowbite-react";
import style from "./HomeCarousel.module.css";

const HomeCarousel = () => {
  return (
    <Carousel className={`w-screen h-[87vh] ${style.customCarousel}`}>
      {[1, 2, 3, 4].map((item, index) => {
        return (
          <div
            key={index}
            className="flex h-full items-center justify-center relative w-full bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: "url(/restaurant.jpg)", height: "87vh" }}
          >
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="absolute top-16 z-20 pl-4 md:pl-20">
              <h1 className="text-white font-bold text-md md:text-4xl">
                Restaurant Name
              </h1>
              <p className="text-white text-md md:text-xl lg:mr-80 md:mr-72 text-left">
                sdjkfjs fnsla dnfkskjsnfl snadlf nsdln klsndgk nsdn lskn knl sdn
                klnsldk nlskndlk nsldn lsdn lgnsdl nglsdn klgnslkdn gsnd lgnsdln
                fm
              </p>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default HomeCarousel;
