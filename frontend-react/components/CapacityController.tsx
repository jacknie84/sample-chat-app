import { TextField } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";
import { CreateChatRoom } from "types";

const rules = {
  required: "필수 값 입니다.",
  min: {
    value: 2,
    message: "2명 이상 인원이 참가 가능한 채팅방만 개설 할 수 있습니다.",
  },
  max: {
    value: 99,
    message: "99명 인원까지 참가 가능 합니다.",
  },
};

function CapacityController(props: UseControllerProps<CreateChatRoom>) {
  const { field, fieldState } = useController({
    ...props,
    rules,
    defaultValue: 2,
  });
  const { onChange, onBlur, value } = field;
  const { invalid, error } = fieldState;

  return (
    <TextField
      label="인원제한"
      variant="standard"
      defaultValue={value}
      onChange={onChange}
      onBlur={onBlur}
      error={invalid}
      helperText={error?.message}
    />
  );
}

export default CapacityController;
