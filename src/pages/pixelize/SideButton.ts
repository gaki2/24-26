import CustomComponent from "../../customComponent/CustomComponent";

const sideButtonsHtmlString = `
<button class="pixelize_image"></button>
<button class="zoom_in_image"></button>
<button class="zoom_out_image"></button>
<button class="change_image"></button>
`;

const SideButton = new CustomComponent(sideButtonsHtmlString, {}, "side_btn_wrapper");

export default SideButton;
