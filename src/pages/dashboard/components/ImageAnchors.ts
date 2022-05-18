import { imageAnchorFallingLionHtml, imageAnchorPixelizeHtml, imageAnchorSparkHtml } from "./htmlString";
import CustomComponent from "../../../customComponent/CustomComponent";

export default function createImageAnchors() {
  // 이미지 앵커를 하나로 감싸는 부모 wrapper 를 생성
  const AllImageAnchorWrapper = CustomComponent.createElement("div", "wrapper");
  // 이미지 앵커를 하나로 감싸는 부모 ul 생성
  const ImageUl = CustomComponent.createElement("ul", "arts");

  // 이미지 앵커 각각을 생성, 첫번째 인자는 htmlString, 두번째는 state, 세번째는 className
  const ImageAnchorFallingLion = new CustomComponent(imageAnchorFallingLionHtml, {}, "image-anchor-fragment-div-style");
  const ImageAnchorPixelize = new CustomComponent(imageAnchorPixelizeHtml, {}, "image-anchor-fragment-div-style");
  const ImageAnchorSpark = new CustomComponent(imageAnchorSparkHtml, {}, "image-anchor-fragment-div-style");

  // 생성한 이미지 앵커를 ul 에 attach 함
  ImageAnchorFallingLion.attachTo(ImageUl);
  ImageAnchorPixelize.attachTo(ImageUl);
  ImageAnchorSpark.attachTo(ImageUl);

  // ul 를 wrapper 에 attach 함
  CustomComponent.attach(AllImageAnchorWrapper, ImageUl);

  // 이미지앵커와 ul 가 붙여진 wrapper 를 리턴함
  return AllImageAnchorWrapper;
}
