import { StompSubscribe } from "./StompMessaging";
import useMessageBody from "./StompMessaging/hooks/message-body";
import usePublishService from "./StompMessaging/hooks/publish-service";

function TestStomp() {
  const { publishString } = usePublishService();

  return (
    <div>
      <StompSubscribe destination="/topic/echo" loading={<div>Loading...</div>}>
        <div>
          <input
            onKeyUp={e =>
              e.code === "Enter" &&
              publishString("/chat/echo", e.currentTarget.value)
            }
          />
        </div>
        <div>
          Message:
          <br />
          <TestStompMessage />
        </div>
      </StompSubscribe>
    </div>
  );
}

function TestStompMessage() {
  const messageBody = useMessageBody<string>();
  return <pre>{messageBody}</pre>;
}

export default TestStomp;
