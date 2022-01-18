import { Button, Pagination, Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  Encodable,
  IdentitySerializer,
  JsonSerializer,
  RSocketClient,
} from "rsocket-core";
import RSocketWebsocketClient from "rsocket-websocket-client";
import { PageRequest, SortRequest } from "types";
import ChatRoomList from "./ChatRoomList";
import useChatRooms from "./hooks/chat-rooms";

const defaultSize = 10;

const basePageRequest = {
  size: defaultSize,
  sort: [{ fields: ["createdDate"], direction: "desc" } as SortRequest],
};

function ChatRooms() {
  useTestRSocket();
  const [totalCount, setTotalCount] = useState<number>(0);
  const pageSize = useMemo(
    () =>
      Math.floor(totalCount / defaultSize) +
      (totalCount % defaultSize > 0 ? 1 : 0),
    [totalCount],
  );
  const [pageRequest, setPageRequest] = useState<PageRequest>({
    page: 0,
    ...basePageRequest,
  });
  const rooms = useChatRooms(pageRequest, setTotalCount);

  return (
    <Stack spacing={1}>
      <ChatRoomList rooms={rooms} />
      <Pagination
        page={pageRequest.page + 1}
        count={pageSize}
        color="primary"
        shape="rounded"
        onChange={(_, page) =>
          setPageRequest({ page: page > 0 ? page - 1 : 0, ...basePageRequest })
        }
      />
      <Button variant="contained" onClick={() => (location.href = "register")}>
        채팅방 만들기
      </Button>
    </Stack>
  );
}

function useTestRSocket() {
  const rsocketClient = useMemo(() => createRSocketClient(), []);

  useEffect(() => {
    rsocketClient.then(client => {
      client
        .requestResponse({
          data: { value: "Hello RSocket!!" },
          metadata:
            String.fromCharCode("request-response".length) + "request-response",
        })
        .subscribe({
          onComplete: value => console.log(value),
          onError: error => console.error(error),
          onSubscribe: cancel => {},
        });
    });
  }, [rsocketClient]);
}

function createRSocketClient() {
  const transport = new RSocketWebsocketClient({ url: "ws://localhost:9080" });
  const client = new RSocketClient<any, Encodable>({
    serializers: {
      data: JsonSerializer,
      metadata: IdentitySerializer,
    },
    setup: {
      keepAlive: 1000000,
      lifetime: 100000,
      dataMimeType: "application/json",
      metadataMimeType: "message/x.rsocket.routing.v0",
    },
    transport,
  });
  return client.connect();
}

export default ChatRooms;
