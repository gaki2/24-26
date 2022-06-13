import CustomComponent from "../../customComponent/CustomComponent";

const MessageHtmlString = `<div class="message-container">
        <p class="message-p">Drag your mouse from side to side.</p>
    </div>`;

const Message = new CustomComponent(MessageHtmlString, {}, null);

export default Message;
