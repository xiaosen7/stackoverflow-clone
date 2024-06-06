// Do not modify this file, it was generated by _scripts/gen-asset-components.ts

/* eslint-disable jsx-a11y/alt-text */

import { mergeClassAndStyleProps } from "@/shared";
import Image, { ImageProps } from "next/image";
import React from "react";

export const ImageStarRed: React.FC<Omit<ImageProps, "src">> = (props) => {
  return mergeClassAndStyleProps(
    props,
    <Image src={"/assets/icons/star-red.svg"} {...props} />
  );
};

export const imageStarRedSrc = "/assets/icons/star-red.svg";
