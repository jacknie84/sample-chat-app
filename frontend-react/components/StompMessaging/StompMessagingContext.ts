import { Client } from "@stomp/stompjs";
import { createContext } from "react";

export default createContext<StompMessageState>({
  isConnected: false,
  client: new Client(),
});

export interface StompMessageState {
  isConnected: boolean;
  client: Client;
}
