import { useContext } from "react";
import StompSubscribeContext from "../StompSubscribeContext";

export default function useMessageBody<T>() {
  const message = useContext(StompSubscribeContext);
  const body = message?.body ?? "";
  try {
    return JSON.parse(body) as T;
  } catch (error) {
    return body;
  }
}
