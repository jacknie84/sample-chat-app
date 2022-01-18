import { isEmpty } from "lodash";
import { useMemo } from "react";
import useSWR from "swr";
import { ChatCategory } from "types";

function useChatCategories(keyword: string) {
  const url = useMemo(() => getChatCategoryApiUrl(keyword), [keyword]);
  const { data = [] } = useSWR<ChatCategory[]>(url, getFetcher(keyword));
  return data;
}

function getChatCategoryApiUrl(keyword: string) {
  const path = "/api/chat/categories";
  const trimmed = keyword.trim();
  if (isEmpty(trimmed)) {
    return path;
  } else {
    const params = new URLSearchParams([["keyword", trimmed]]);
    return `${path}?${params}`;
  }
}

function getFetcher(keyword: string) {
  const trimmed = keyword.trim();
  if (isEmpty(trimmed)) {
    return async () => [];
  } else {
    return async (url: string) => {
      const response = await fetch(url);
      return await response.json();
    };
  }
}

export default useChatCategories;
