import {
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import StompMessagingContext from "./StompMessagingContext";
import StompSubscribeContext, { StompMessage } from "./StompSubscribeContext";

type Props = { destination: string; loading: ReactNode };

function StompSubscribe({
  destination,
  loading,
  children,
}: PropsWithChildren<Props>) {
  const { isConnected, client } = useContext(StompMessagingContext);
  const [message, setMessage] = useState<StompMessage>();

  useEffect(() => {
    if (isConnected) {
      const unsubscription = client.subscribe(destination, message => {
        const { headers } = message;
        if (destination === headers.destination) {
          setMessage({
            command: message.command,
            headers: message.headers,
            body: message.body,
            subscriptedDate: new Date(),
            originalMessage: message,
          });
        }
      });
      return () => unsubscription.unsubscribe();
    }
  }, [isConnected, destination, client]);

  return (
    <>
      {isConnected ? (
        <StompSubscribeContext.Provider value={message}>
          {children}
        </StompSubscribeContext.Provider>
      ) : (
        loading
      )}
    </>
  );
}

export default StompSubscribe;
