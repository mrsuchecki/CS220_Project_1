import type { Color, Image } from "../include/image.js";

/**
 * Removes all red color from an image
 * @param img An image
 * @returns A new image where each pixel has the red channel removed
 */
export function removeRed(img: Image): Image {
  let newImg = img.copy();
  for (let i = 0; i < newImg.width; ++i) {
    for (let j = 0; j < newImg.height; ++j) {
      let pixel = newImg.getPixel(i, j);
      pixel[0] = 0;
      newImg.setPixel(i, j, pixel);
    }
  }
  return newImg;
}

/**
 * Flips the colors of an image
 * @param img An image
 * @returns A new image where each pixel's channel has been
 *  set as the truncated average of the other two
 */
export function flipColors(img: Image): Image {
  let newImg = img.copy();
  for (let i = 0; i < newImg.width; ++i) {
    for (let j = 0; j < newImg.height; ++j) {
      let pixel = newImg.getPixel(i, j);
      let flipRed = Math.floor((pixel[1] + pixel[2]) / 2);
      let flipGreen = Math.floor((pixel[0] + pixel[2]) / 2);
      let flipBlue = Math.floor((pixel[0] + pixel[1]) / 2);
      let newPixel = [flipRed, flipGreen, flipBlue];
      newImg.setPixel(i, j, newPixel);
    }
  }
  return newImg;
}

/**
 * Modifies the given `img` such that the value of each pixel
 * in the given line is the result of applying `func` to the
 * corresponding pixel of `img`. If `lineNo` is not a valid line
 * number, then `img` should not be modified.
 * @param img An image
 * @param lineNo A line number
 * @param func A color transformation function
 */
export function mapLine(img: Image, lineNo: number, func: (c: Color) => Color): void {
  let newImg = img.copy();
  if (lineNo >= 0) {
    for (let i = 0; i < newImg.width; ++i) {
      for (let j = 0; j < lineNo; ++j) {
        let pixel = newImg.getPixel(i, j);
        newImg.setPixel(i, lineNo, func(pixel));
      }
    }
  }
}

/**
 * The result must be a new image with the same dimensions as `img`.
 * The value of each pixel in the new image should be the result of
 * applying `func` to the corresponding pixel of `img`.
 * @param img An image
 * @param func A color transformation function
 */
export function imageMap(img: Image, func: (c: Color) => Color): Image {
  let newImg = img.copy();
  for (let i = 0; i < newImg.width; ++i) {
    for (let j = 0; j < newImg.height; ++j) {
      let pixel = newImg.getPixel(i, j);
      newImg.setPixel(i, j, func(pixel));
    }
  }
  return newImg;
}

/**
 * Removes all red color from an image
 * @param img An image
 * @returns A new image where each pixel has the red channel removed
 */
export function mapToGB(img: Image): Image {
  function noRed(pixel: number[]): number[] {
    const newPixel = [0, pixel[1], pixel[2]];
    return newPixel;
  }
  return imageMap(img, noRed);
}

/**
 * Flips the colors of an image
 * @param img An image
 * @returns A new image where each pixels channel has been
 *  set as the truncated average of the other two
 */
export function mapFlipColors(img: Image): Image {
  function flip(pixel: number[]): number[] {
    return [
      Math.floor((pixel[1] + pixel[2]) / 2),
      Math.floor((pixel[0] + pixel[2]) / 2),
      Math.floor((pixel[0] + pixel[1]) / 2),
    ];
  }
  return imageMap(img, flip);
}
