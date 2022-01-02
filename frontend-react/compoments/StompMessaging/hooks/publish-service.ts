import { useCallback, useContext } from "react";
import StompMessagingContext from "../StompMessagingContext";

export default function usePublishService() {
  const { client } = useContext(StompMessagingContext);
  const publishString = useCallback(
    (
      destination: string,
      body: string | undefined,
      headers: Record<string, string> = { "content-type": "text/plain" },
    ) => client.publish({ destination, headers, body }),
    [client],
  );
  const publishJson = useCallback(
    (destination: string, messageBody: any) => {
      const body = messageBody ? JSON.stringify(messageBody) : undefined;
      publishString(destination, body, { "content-type": "application/json" });
    },
    [publishString],
  );

  return { publishString, publishJson };
}
