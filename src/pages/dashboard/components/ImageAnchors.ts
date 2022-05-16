import { imageAnchorFallingLionHtml, imageAnchorPixelizeHtml, imageAnchorSparkHtml } from "../../../htmlString";
import CustomComponent from "../../../customComponent/CustomComponent";

export default function createImageAnchors() {
  const AllImageAnchorWrapper = CustomComponent.createElement("div", "wrapper");
  const ImageUl = CustomComponent.createElement("ul", "arts");
  const ImageAnchorFallingLion = new CustomComponent(imageAnchorFallingLionHtml, {}, "image-anchor-fragment-div-style");
  const ImageAnchorPixelize = new CustomComponent(imageAnchorPixelizeHtml, {}, "image-anchor-fragment-div-style");
  const ImageAnchorSpark = new CustomComponent(imageAnchorSparkHtml, {}, "image-anchor-fragment-div-style");

  ImageAnchorFallingLion.attachTo(ImageUl);
  ImageAnchorPixelize.attachTo(ImageUl);
  ImageAnchorSpark.attachTo(ImageUl);

  CustomComponent.attach(AllImageAnchorWrapper, ImageUl);

  return AllImageAnchorWrapper;
}
