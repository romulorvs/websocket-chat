import { useCallback, useState } from "react";
import { useGlobalState } from "../../store/store";
import { SVGSend } from "../../svg";
import { Form } from "./input.styles";

function Input() {
  const { user } = useGlobalState();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      return;
    }
    alert(inputValue.trim());
  }, [inputValue]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setInputValue(value);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key.toLowerCase().trim() === "enter") {
      handleSubmit({
        preventDefault: () => {},
      } as React.FormEvent<HTMLFormElement>);
    }
  }, [inputValue]);

  return (
    <Form onSubmit={handleSubmit}>
      <div className="input-container">
        <div className="textarea-container">
          <textarea
            value={inputValue}
            onChange={handleChange}
            disabled={!user.id}
            onKeyDown={handleKeyDown}
            placeholder="write your message..."
          />
          <span className={inputValue.trim() ? "show" : undefined}>
            press <b>CTRL+Enter</b> to send the message
          </span>
        </div>
        <div className="button-container">
          <button type="submit" title="Send" disabled={!inputValue.trim()}>
            {SVGSend}
          </button>
        </div>
      </div>
    </Form>
  );
}

export default Input;
