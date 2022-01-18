import { Autocomplete, TextField } from "@mui/material";
import { debounce } from "lodash";
import { useState } from "react";
import { ChatCategory } from "types";
import useChatCategories from "./hooks/chat-categories";

type Props = {
  label: string;
  error?: boolean;
  helperText?: string;
  onChange?: (category: ChatCategory) => void;
  onBlur?: () => void;
};

function ChatCategorySelect({
  label,
  error,
  helperText,
  onChange = () => {},
  onBlur = () => {},
}: Props) {
  const [keyword, setKeyword] = useState<string>("");
  const categories = useChatCategories(keyword);
  const onChangeKeyword = debounce((value: string) => setKeyword(value), 300);

  return (
    <Autocomplete
      options={categories}
      getOptionLabel={category => category.name}
      onChange={(_, category) => onChange(category as ChatCategory)}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          error={error}
          helperText={helperText}
          onChange={e => onChangeKeyword(e.target.value ?? "")}
          onBlur={onBlur}
        />
      )}
    />
  );
}

export default ChatCategorySelect;
