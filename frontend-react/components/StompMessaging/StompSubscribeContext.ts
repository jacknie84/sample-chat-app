import { Message } from "@stomp/stompjs";
import { createContext } from "react";

export default createContext<StompMessage | undefined>(undefined);

export interface StompMessage {
  command: string;
  headers: Record<string, string>;
  body: string;
  subscriptedDate: Date;
  originalMessage: Message;
}
