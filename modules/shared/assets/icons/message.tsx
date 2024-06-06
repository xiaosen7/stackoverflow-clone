// Do not modify this file, it was generated by _scripts/gen-asset-components.ts

/* eslint-disable jsx-a11y/alt-text */

import { mergeClassAndStyleProps } from "@/shared";
import Image, { ImageProps } from "next/image";
import React from "react";

export const ImageMessage: React.FC<Omit<ImageProps, "src">> = (props) => {
  return mergeClassAndStyleProps(
    props,
    <Image src={"/assets/icons/message.svg"} {...props} />
  );
};

export const imageMessageSrc = "/assets/icons/message.svg";
