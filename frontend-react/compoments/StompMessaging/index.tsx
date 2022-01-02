import React, { PropsWithChildren, useCallback, useState } from "react";
import useStompClient from "./hooks/stomp-client";
import StompMessagingContext from "./StompMessagingContext";
import StompSubscribe from "./StompSubscribe";

type Props = { sockJsUrl: string };

function StompMessaging({ sockJsUrl, children }: PropsWithChildren<Props>) {
  const [isConnected, setIsConnected] = useState(false);
  const client = useStompClient(
    sockJsUrl,
    useCallback(() => setIsConnected(true), []),
    useCallback(() => setIsConnected(false), []),
  );

  return (
    <StompMessagingContext.Provider value={{ isConnected, client }}>
      {children}
    </StompMessagingContext.Provider>
  );
}

export default StompMessaging;
export { StompSubscribe };
