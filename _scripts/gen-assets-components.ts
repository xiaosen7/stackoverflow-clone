import { camelCase, pascalCase } from "change-case";
import fg from "fast-glob";
import fsx from "fs-extra";
import { writeFile } from "fs/promises";

import { basename, dirname, extname, join, relative } from "path";
import { dedent } from "ts-dedent";

(async () => {
  const projectRoot = join(__dirname, "..");
  const publicDir = join(projectRoot, "public");
  const publicAssetsDir = join(publicDir, "assets");
  const outDir = join(projectRoot, "components", "asset");

  const assetPaths = await fg([join("**/*.{svg,png,jpg}")], {
    cwd: publicAssetsDir,
    absolute: true,
  });

  await Promise.all(
    assetPaths.map(async (fsPath) => {
      await assetToComponent(fsPath);
    })
  );

  async function assetToComponent(fsPath: string) {
    const ext = extname(fsPath).slice(1);
    switch (ext) {
      case "svg":
      case "png":
      case "jpg":
        await toImage();
        break;

      default:
        throw new Error(`Unknown extension: ${ext}, at file path: ${fsPath}`);
    }

    async function toImage() {
      const url = relative(publicDir, fsPath);
      if (url.startsWith(".")) {
        throw new Error(`Invalid path: ${url}`);
      }

      const fsBaseName = basename(fsPath, extname(fsPath));
      const componentName = `Image${pascalCase(fsBaseName)}`;
      const outputPath = join(
        outDir,
        dirname(relative(publicAssetsDir, fsPath)),
        `${fsBaseName}.tsx`
      );
      const content = dedent`
      // Do not modify this file, it was generate by ${relative(projectRoot, __filename)}

      /* eslint-disable jsx-a11y/alt-text */

      import { mergeClassAndStyleProps } from "@lib/utils";
      import Image, { ImageProps } from "next/image";
      import React from "react";
      
      export const ${componentName}: React.FC<Omit<ImageProps, "src">> = (props) => {
        return mergeClassAndStyleProps(
          props, 
          <Image src={"/${url}"} {...props}/>
        );
      };

      export const ${camelCase(componentName + "Src")} = "/assets/icons/suitcase.svg";
      `;

      await fsx.ensureFile(outputPath);
      await writeFile(outputPath, content);
      console.log("Generated:", relative(projectRoot, outputPath));
    }
  }
})();
