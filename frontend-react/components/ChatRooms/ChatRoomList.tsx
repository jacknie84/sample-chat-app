import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { isEmpty } from "lodash";
import { ChatRoom } from "types";

type Props = { rooms?: ChatRoom[] };

function ChatRoomList({ rooms = [] }: Props) {
  return (
    <List>
      {isEmpty(rooms) ? (
        <ListItem>
          <ListItemText>검색된 채팅방이 없습니다</ListItemText>
        </ListItem>
      ) : (
        rooms.map(room => (
          <ListItem key={`${room.id}`}>
            <ListItemButton>
              <ListItemText>
                {room.subject} ({room.size} / {room.capacity})
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))
      )}
    </List>
  );
}

export default ChatRoomList;
