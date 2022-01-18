import { useController, UseControllerProps } from "react-hook-form";
import { ChatCategory, CreateChatCategory } from "types";
import ChatCategorySelect from "../ChatCategorySelect";

function ParentIdController(props: UseControllerProps<CreateChatCategory>) {
  const { field, fieldState } = useController({ ...props });
  const { onBlur } = field;
  const { invalid, error } = fieldState;
  const onChange = (category: ChatCategory) => field.onChange(category?.id);

  return (
    <ChatCategorySelect
      label="부모 카테고리"
      onChange={onChange}
      onBlur={onBlur}
      error={invalid}
      helperText={error?.message}
    />
  );
}

export default ParentIdController;
