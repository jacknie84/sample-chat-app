import { Button, Pagination, Stack } from "@mui/material";
import { useMemo, useState } from "react";
import { PageRequest, SortRequest } from "types";
import ChatRoomList from "./ChatRoomList";
import useChatRooms from "./hooks/chat-rooms";

const defaultSize = 10;

const basePageRequest = {
  size: defaultSize,
  sort: [{ fields: ["createdDate"], direction: "desc" } as SortRequest],
};

function ChatRooms() {
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

export default ChatRooms;
