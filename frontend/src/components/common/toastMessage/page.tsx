import { message } from "antd";

const toastms = (openMessage: boolean) => {
  message.open({
    type: openMessage ? "success" : "error",
    content: openMessage
      ? "This is a success message"
      : "This is an error message",
  });
};

export default toastms;
