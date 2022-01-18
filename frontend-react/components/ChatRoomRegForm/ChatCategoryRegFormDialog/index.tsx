import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { CreateChatCategory } from "types";
import NameController from "./NameController";
import ParentIdController from "./ParentIdController";

type Props = { isOpen: boolean; onClose: () => void };

function ChatCategoryRegFormDialog({ isOpen, onClose }: Props) {
  const { control, handleSubmit } = useForm<CreateChatCategory>({
    mode: "all",
  });
  const onClickSaveAsync = useMemo(
    () => handleSubmit(category => onSubmitAsync(category, onClose)),
    [handleSubmit, onClose],
  );

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>카테고리 등록</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <NameController name="name" control={control} />
          <ParentIdController name="parentId" control={control} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onClose}>
          닫기
        </Button>
        <Button variant="contained" onClick={onClickSaveAsync}>
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
}

async function onSubmitAsync(
  category: CreateChatCategory,
  onClose: () => void,
) {
  await fetch("/api/chat/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  onClose();
}

export default ChatCategoryRegFormDialog;
