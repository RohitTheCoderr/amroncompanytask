"use client";

import { useState } from "react";
import Image from "next/image";
import ProductCard from "./(components)/productcard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  // "/images/assests company newweb/mainbanner.png",
  "/images/assests company newweb/mainbanner1.webp",
  "/images/assests company newweb/mainbanner2.webp",
  // "/images/assests company newweb/mainbanner-3.jpg",
];

const productsArray = [
  {
    name: "I love you khushi shirt with full baju ",
    image: "/images/assests company newweb/Rectangle 58.png",
    price: 499,
    dis: 15,
    size: ["S", "M", "L", "Xl"],
    description:
      "One of the best cloths in india its super soft shirt fevric is also best quality",
  },
  {
    name: "shirt with full baju",
    image: "/images/assests company newweb/Rectangle 57.png",
    price: 399,
    dis: 10,
    size: ["S", "M", "L", "Xl"],
    description:
      "One of the best cloths in india its super soft shirt fevric is also best quality",
  },
  {
    name: "shirt with full baju",
    image: "/images/assests company newweb/Rectangle 59.png",
    price: 699,
    dis: 10,
    size: ["S", "M", "L", "Xl"],
    description:
      "One of the best cloths in india its super soft shirt fevric is also best quality",
  },
  {
    name: "shirt with full baju",
    image: "/images/assests company newweb/Rectangle 60.png",
    price: 449,
    dis: 25,
    size: ["S", "M", "L", "Xl"],
    description:
      "One of the best cloths in india its super soft shirt fevric is also best quality",
  },
  {
    name: "shirt with full baju",
    image: "/images/assests company newweb/Rectangle 61.png",
    price: 479,
    dis: 12,
    size: ["S", "M", "L", "Xl"],
    description:
      "One of the best cloths in india its super soft shirt fevric is also best quality",
  },
];

export default function Home() {
  const [my, setMy] = useState();
  return (
    <div className="w-full min-h-min">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        navigation
        pagination={{ clickable: true, color: "#de6a2a" }}
        className="w-full min-h-[10rem] h-auto"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              src={img}
              alt={`Banner ${index}`}
              width={1200} // or any large width
              height={600} // or any height based on your image aspect
              className="w-full min-h-[10rem] h-auto object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="text-2xl sm:text-3xl text-center font-bold mt-12 mb-8 capitalize">
        Our Popular products
      </div>
      {/* Product List */}
      <div className="flex justify-around flex-wrap gap-6 px-12">
        {productsArray.map((details, index) => (
          <ProductCard key={index} items={details} />
        ))}
      </div>
    </div>
  );
}
