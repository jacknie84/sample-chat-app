import { useCallback, useMemo } from "react";
import useSWR from "swr";
import { ChatRoom, PageRequest } from "types";

function useChatRooms(
  pageRequest: PageRequest,
  onLoadTotalCount: (totalCount: number) => void,
) {
  const url = useMemo(() => getChatRoomApiUrl(pageRequest), [pageRequest]);
  const fetcher = useCallback(
    async (url: string) => {
      const response = await fetch(url);
      const totalCount = parseInt(response.headers.get("X-Total-Count") ?? "0");
      onLoadTotalCount(totalCount);
      return await response.json();
    },
    [onLoadTotalCount],
  );
  const { data } = useSWR<ChatRoom[]>(url, fetcher);
  return data;
}

function getChatRoomApiUrl(pageRequest: PageRequest) {
  const { page, size, sort } = pageRequest;
  const params = new URLSearchParams([
    ["page", `${page}`],
    ["size", `${size}`],
    ...sort.map(({ fields, direction }) => [
      "sort",
      `${fields.join(",")},${direction}`,
    ]),
  ]);
  return `/api/chat/rooms?${params}`;
}

export default useChatRooms;
