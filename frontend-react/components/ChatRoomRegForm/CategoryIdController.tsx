import { useController, UseControllerProps } from "react-hook-form";
import { ChatCategory, CreateChatRoom } from "types";
import ChatCategorySelect from "./ChatCategorySelect";

const rules = { required: "필수 값 입니다." };

function CategoryIdController(props: UseControllerProps<CreateChatRoom>) {
  const { field, fieldState } = useController({ ...props, rules });
  const { onBlur } = field;
  const { invalid, error } = fieldState;
  const onChange = (category: ChatCategory) => field.onChange(category?.id);

  return (
    <ChatCategorySelect
      label="카테고리"
      onChange={onChange}
      onBlur={onBlur}
      error={invalid}
      helperText={error?.message}
    />
  );
}

export default CategoryIdController;
