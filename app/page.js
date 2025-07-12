"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ProductCard from "./(components)/productcard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../reduxStore/slices/productSlice";
import { fetchCart } from "../reduxStore/slices/cartSlice";

const images = [
  "/images/assests company newweb/mainbanner1.webp",
  "/images/assests company newweb/mainbanner2.webp",
  // "/images/assests company newweb/mainbanner-3.jpg",
];

export default function Home() {
  const dispatch = useDispatch();

  const [productslist, setProductslist] = useState([]);
  const { items, loading, error } = useSelector((state) => state.products);
  
  useEffect(() => {
    if (!items || items.length === 0) {
      dispatch(fetchAllProducts());
    }
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (items?.length > 0) {
      setProductslist(items);
      localStorage.setItem("products", JSON.stringify(items));
    } else {
      const stored = JSON.parse(localStorage.getItem("products")) || [];
      setProductslist(stored);
    }
  }, [items]);

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
        {images?.map((img, index) => (
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

      <div className="flex justify-around flex-wrap gap-6 px-12">
        {productslist?.map((details, index) => (
          <ProductCard key={index} items={details} />
        ))}
      </div>
    </div>
  );
}
