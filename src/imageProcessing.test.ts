import assert from "node:assert";
import { Color, COLORS, Image } from "../include/image.js";
import { flipColors, imageMap, mapFlipColors, mapLine, mapToGB, removeRed } from "./imageProcessing.js";

describe("removeRed", () => {
  it("should remove red from the upper left corner", () => {
    const whiteImage = Image.create(10, 10, COLORS.WHITE);
    const gbImage = removeRed(whiteImage);
    const p = gbImage.getPixel(0, 0);

    assert(p[0] === 0, "The red channel should be 0.");
    assert(p[1] === 255, "The green channel should be 255.");
    assert(p[2] === 255, "The blue channel should be 255.");

    // or alternatively, using jest, if you'd like
    // https://jestjs.io/docs/expect#toequalvalue
    // Use expect with .toEqual to compare recursively all properties of object instances (also known as "deep" equality).

    expect(p).toEqual([0, 255, 255]);

    // This will produce output showing the exact differences between the two objects, which is really helpful
    // for debugging. However, again, please use the simpler assert syntax if this is too confusing.
    // Focus on making your tests well written and correct, rather than using one syntax or another.
  });

  it("should remove red from the center", () => {
    const whiteImage = Image.create(10, 10, COLORS.WHITE);
    const gbImage = removeRed(whiteImage);
    const p = gbImage.getPixel(5, 5);

    assert(p[0] === 0, "The red channel should be 0.");
    assert(p[1] === 255, "The green channel should be 255.");
    assert(p[2] === 255, "The blue channel should be 255.");
  });

  // More tests for removeRed go here.
});

describe("flipColors", () => {
  it("should correctly flip top left corner", () => {
    const whiteImage = Image.create(10, 10, COLORS.WHITE);
    // A white image is not particularly helpful in this context
    whiteImage.setPixel(0, 0, [100, 0, 150]);
    const flippedWhiteImage = flipColors(whiteImage);
    const p = flippedWhiteImage.getPixel(0, 0);

    assert(p[0] === 75);
    assert(p[1] === 125);
    assert(p[2] === 50);
  });

  // More tests for flipColors go here.
});

describe("mapLine", () => {
  it("should modify only one line", () => {
    const redImage = Image.create(10, 10, COLORS.RED);
    function turnWhite(c: Color): Color {
      c = COLORS.WHITE;
      return c;
    }
    mapLine(redImage, 2, turnWhite);
    const redPixel = redImage.getPixel(4, 4);
    const whitePixel = redImage.getPixel(1, 1);
    assert(redPixel !== whitePixel);
  });
});

describe("imageMap", () => {
  it("should modify the whole image", () => {
    const redImage = Image.create(10, 10, COLORS.RED);
    function turnWhite(c: Color): Color {
      c = COLORS.WHITE;
      return c;
    }
    imageMap(redImage, turnWhite);
    const pix1 = redImage.getPixel(1, 1);
    const pix2 = redImage.getPixel(2, 2);
    assert(pix1[0] === pix2[0]);
    assert(pix1[1] === pix2[1]);
    assert(pix1[2] === pix2[2]);
  });
});

describe("mapToGB", () => {
  it("should modify the whole image", () => {
    const redImage = Image.create(10, 10, COLORS.RED);
    const whiteImage = Image.create(10, 10, COLORS.WHITE);
    const newImage = mapToGB(redImage);
    const pix1 = whiteImage.getPixel(1, 1);
    const pix2 = newImage.getPixel(1, 1);
    assert(pix1[0] === 255);
    assert(pix1[1] === 255);
    assert(pix1[2] === 255);
    assert(pix2[0] === 0);
  });
});

describe("mapFlipColors", () => {
  it("should work idk", () => {
    const redImage = Image.create(10, 10, COLORS.RED);
    const newImage = mapFlipColors(redImage);
    const pix2 = newImage.getPixel(1, 1);
    assert(pix2[0] === 0);
    assert(pix2[1] === 127);
    assert(pix2[2] === 127);
  });
});
