import { Button, Stack } from "@mui/material";
import CapacityController from "components/CapacityController";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateChatRoom } from "types";
import CategoryIdController from "./CategoryIdController";
import ChatCategoryRegFormDialog from "./ChatCategoryRegFormDialog";
import SubjectController from "./SubjectController";

function ChatRoomRegForm() {
  const [isOpenDiaload, setIsOpenDialog] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<CreateChatRoom>({ mode: "all" });
  const onClickSaveAsync = handleSubmit(onSubmitAsync);

  return (
    <>
      <Stack spacing={1}>
        <CategoryIdController name="categoryId" control={control} />
        <Button color="primary" onClick={() => setIsOpenDialog(true)}>
          카테고리 등록
        </Button>
        <SubjectController name="subject" control={control} />
        <CapacityController name="capacity" control={control} />
        <Stack direction="row-reverse" spacing={2}>
          <Button variant="contained" onClick={onClickSaveAsync}>
            저장
          </Button>
          <Button color="secondary" onClick={() => (location.href = "/")}>
            취소
          </Button>
        </Stack>
      </Stack>
      <ChatCategoryRegFormDialog
        isOpen={isOpenDiaload}
        onClose={() => setIsOpenDialog(false)}
      />
    </>
  );
}

async function onSubmitAsync(room: CreateChatRoom) {
  await fetch("/api/chat/rooms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(room),
  });
  location.href = "/";
}

export default ChatRoomRegForm;
