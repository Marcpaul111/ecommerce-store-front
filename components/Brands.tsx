// https://cruip.com/create-an-infinite-horizontal-scroll-animation-with-tailwind-css/
import React from "react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

import apple from "../public/assets/images/apple.svg";
import supreme from "../public/assets/images/supreme.svg";
import hermes from "../public/assets/images/hermes.svg";
import samsung from "../public/assets/images/samsung.svg";
import adidas from "../public/assets/images/adidas.svg";
import chanel from "../public/assets/images/chanel.svg";
import dior from "../public/assets/images/dior.svg";
import levis from "../public/assets/images/levis.svg";
import nike from "../public/assets/images/nike.svg";
import nokia from "../public/assets/images/nokia.svg";

function Brands() {
  return (
    <>
      <div className="relative flex items-center justify-center mb-4">
        <Separator className="absolute top-1/2 w-full transform -translate-y-1/2 text-lg bg-gray-900" />
        <h3 className="relative z-10 font-bold text-3xl bg-white text-center px-10">
          Our Brands
        </h3>
      </div>
      <div className="w-full text-5xl py-8  inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] ">
        <ul className="flex items-center justify-center md:justify-start sm:[&_li]:mx-8 [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll sm:gap-x-6">
          <li>
            <a
              target="_blank"
              href="https://x.com/naymur_dev"
              className=" bg-none  text-primary-foreground text-2xl  sm:grid  place-content-center  p-2   rounded-md"
            >
              <Image src={apple} alt="" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://x.com/naymur_dev"
              className=" bg-none  text-primary-foreground text-2xl  sm:grid  place-content-center  p-2   rounded-md"
            >
              <Image src={hermes} alt="" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://x.com/naymur_dev"
              className=" bg-none  text-primary-foreground text-2xl  sm:grid  place-content-center  p-2   rounded-md"
            >
              <Image src={samsung} alt="" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://x.com/naymur_dev"
              className=" bg-none  text-primary-foreground text-2xl  sm:grid  place-content-center  p-2   rounded-md"
            >
              <Image src={adidas} alt="" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://x.com/naymur_dev"
              className=" bg-none  text-primary-foreground text-2xl  sm:grid  place-content-center  p-2   rounded-md"
            >
              <Image src={nokia} alt="" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://x.com/naymur_dev"
              className=" bg-none  text-primary-foreground text-2xl  sm:grid  place-content-center  p-2   rounded-md"
            >
              <Image src={nike} alt="" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://x.com/naymur_dev"
              className=" bg-none  text-primary-foreground text-2xl  sm:grid  place-content-center  p-2   rounded-md"
            >
              <Image src={levis} alt="" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://x.com/naymur_dev"
              className=" bg-none  text-primary-foreground text-2xl  sm:grid  place-content-center  p-2   rounded-md"
            >
              <Image src={dior} alt="" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://x.com/naymur_dev"
              className=" bg-none  text-primary-foreground text-2xl  sm:grid  place-content-center  p-2   rounded-md"
            >
              <Image src={supreme} alt="" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://x.com/naymur_dev"
              className=" bg-none  text-primary-foreground text-2xl  sm:grid  place-content-center  p-2   rounded-md"
            >
              <Image src={chanel} alt="" />
            </a>
          </li>
        </ul>
        <ul
          className="flex items-center justify-center md:justify-start sm:[&_li]:mx-8 [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll"
          aria-hidden="true"
        >
          <li>
            <a
              target="_blank"
              href="https://x.com/naymur_dev"
              className=" bg-none  text-primary-foreground text-2xl  sm:grid  place-content-center  p-2   rounded-md"
            >
              <Image src={apple} alt="" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://x.com/naymur_dev"
              className=" bg-none  text-primary-foreground text-2xl  sm:grid  place-content-center  p-2   rounded-md"
            >
              <Image src={hermes} alt="" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://x.com/naymur_dev"
              className=" bg-none  text-primary-foreground text-2xl  sm:grid  place-content-center  p-2   rounded-md"
            >
              <Image src={samsung} alt="" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://x.com/naymur_dev"
              className=" bg-none  text-primary-foreground text-2xl  sm:grid  place-content-center  p-2   rounded-md"
            >
              <Image src={adidas} alt="" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://x.com/naymur_dev"
              className=" bg-none  text-primary-foreground text-2xl  sm:grid  place-content-center  p-2   rounded-md"
            >
              <Image src={nokia} alt="" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://x.com/naymur_dev"
              className=" bg-none  text-primary-foreground text-2xl  sm:grid  place-content-center  p-2   rounded-md"
            >
              <Image src={nike} alt="" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://x.com/naymur_dev"
              className=" bg-none  text-primary-foreground text-2xl  sm:grid  place-content-center  p-2   rounded-md"
            >
              <Image src={levis} alt="" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://x.com/naymur_dev"
              className=" bg-none  text-primary-foreground text-2xl  sm:grid  place-content-center  p-2   rounded-md"
            >
              <Image src={dior} alt="" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://x.com/naymur_dev"
              className=" bg-none  text-primary-foreground text-2xl  sm:grid  place-content-center  p-2   rounded-md"
            >
              <Image src={supreme} alt="" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://x.com/naymur_dev"
              className=" bg-none  text-primary-foreground text-2xl  sm:grid  place-content-center  p-2   rounded-md"
            >
              <Image src={chanel} alt="" />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Brands;
