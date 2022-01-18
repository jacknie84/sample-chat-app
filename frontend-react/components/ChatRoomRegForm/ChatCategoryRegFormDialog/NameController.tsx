import { TextField } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";
import { CreateChatCategory } from "types";

const rules = {
  required: "필수 값 입니다.",
  minLength: {
    value: 2,
    message: "이름은 2자 이상 입력 해야 합니다.",
  },
  maxLength: {
    value: 10,
    message: "이름은 10자 까지 입력 가능 합니다.",
  },
};

function NameController(props: UseControllerProps<CreateChatCategory>) {
  const { field, fieldState } = useController({ ...props, rules });
  const { onChange, onBlur } = field;
  const { invalid, error } = fieldState;

  return (
    <TextField
      margin="dense"
      label="카테고리 이름"
      variant="standard"
      error={invalid}
      helperText={error?.message}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

export default NameController;
