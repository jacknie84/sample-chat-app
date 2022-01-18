export interface ChatRoom {
  id: number;
  categoryId: number;
  subject: string;
  capacity: number;
  size: number;
  createdDate: string;
  createdBy: string;
}

export interface CreateChatRoom {
  categoryId: number;
  subject: string;
  capacity: number;
}

export interface ChatCategory {
  id: number;
  name: string;
  parent?: ChatCategory;
}

export interface CreateChatCategory {
  name: string;
  parentId?: number;
}

export interface PageRequest {
  page: number;
  size: number;
  sort: SortRequest[];
}

export interface SortRequest {
  fields: string[];
  direction: "asc" | "desc";
}
