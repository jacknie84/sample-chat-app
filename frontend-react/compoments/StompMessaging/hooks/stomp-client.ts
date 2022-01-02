import { Client } from "@stomp/stompjs";
import { useMemo } from "react";
import SockJS from "sockjs-client";

export default function useStompClient(
  sockJsUrl: string,
  onConnect: () => void,
  onDisconnect: () => void,
) {
  return useMemo(() => {
    const client = new Client({
      webSocketFactory() {
        return new SockJS(sockJsUrl);
      },
      debug(msg) {
        console.log("[DEBUG]", msg);
      },
      onChangeState(state) {
        console.log("[CHANGE_STATE]", state);
      },
      onConnect(receipt) {
        console.log("[CONNECTED]", receipt.headers);
        onConnect();
      },
      onDisconnect(receipt) {
        console.log("[DISCONNECTED]", receipt.headers);
        onDisconnect();
      },
      onStompError(receipt) {
        console.log("[ERROR]", receipt.headers, receipt.body);
      },
    });
    client.activate();
    return client;
  }, [sockJsUrl, onConnect, onDisconnect]);
}
