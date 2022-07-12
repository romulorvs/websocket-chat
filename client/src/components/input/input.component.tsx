import dbouncer from "dbouncer";
import { useCallback, useEffect, useState } from "react";
import { useGlobalState } from "../../store/store";
import { SVGAnimatedQuote, SVGSend } from "../../svg";
import { sendRequest } from "../connection/connection.component";
import { Form } from "./input.styles";

const usersTypingDebouncer = dbouncer();

function Input() {
  const { user, usersTyping, setUsersTyping, messages } = useGlobalState();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      return;
    }
    sendRequest("send_message", inputValue.trim());
    setInputValue("");
  }, [inputValue]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setInputValue(value);
    sendRequest("user_typing");
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key.toLowerCase().trim() === "enter") {
      handleSubmit({
        preventDefault: () => {},
      } as React.FormEvent<HTMLFormElement>);
    }
  }, [inputValue]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  useEffect(() => {
    if (usersTyping) {
      usersTypingDebouncer(() => setUsersTyping([]), 4000);
    }
    console.log();
  }, [usersTyping]);

  return (
    <Form onSubmit={handleSubmit}>
      <div className="input-container">
        {!!usersTyping.length && (
          <span className="users-typing">
            {SVGAnimatedQuote}{" "}
            {usersTyping.length === 1
              ? `${usersTyping[0]} is typing...`
              : usersTyping.length === 2
              ? `${usersTyping[0]} and ${usersTyping[1]} are typing...`
              : "3 or more people are typing..."}
          </span>
        )}
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
