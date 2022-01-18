import { TextField } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";
import { CreateChatRoom } from "types";

const rules = {
  required: "필수 값 입니다.",
  minLength: {
    value: 2,
    message: "주제는 2자 이상 입력 해야 합니다.",
  },
  maxLength: {
    value: 30,
    message: "주제는 30자 까지 입력 가능 합니다.",
  },
};

function SubjectController(props: UseControllerProps<CreateChatRoom>) {
  const { field, fieldState } = useController({ ...props, rules });
  const { onChange, onBlur } = field;
  const { invalid, error } = fieldState;

  return (
    <TextField
      label="주제"
      variant="standard"
      onChange={onChange}
      onBlur={onBlur}
      error={invalid}
      helperText={error?.message}
    />
  );
}

export default SubjectController;
