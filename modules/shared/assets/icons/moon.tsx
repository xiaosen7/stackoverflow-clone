// Do not modify this file, it was generated by _scripts/gen-asset-components.ts

/* eslint-disable jsx-a11y/alt-text */

import { mergeClassAndStyleProps } from "@/shared";
import Image, { ImageProps } from "next/image";
import React from "react";

export const ImageMoon: React.FC<Omit<ImageProps, "src">> = (props) => {
  return mergeClassAndStyleProps(
    props,
    <Image src={"/assets/icons/moon.svg"} {...props} />
  );
};

export const imageMoonSrc = "/assets/icons/moon.svg";
