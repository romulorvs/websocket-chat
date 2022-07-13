import { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import { useGlobalState } from "../../store/store";
import { Container } from "./modal.styles";

function Modal() {
  const { user, setUser } = useGlobalState();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser({
      ...user,
      id: uuid(),
      name: inputValue.trim(),
    });
  }, [inputValue]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trimStart());
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement, Element>) => {
    setInputValue(e.target.value.trim());
  }, []);

  return (
    <Container>
      <form className="content" onSubmit={handleSubmit}>
        <h2>Start Chatting Today!</h2>
        <label>
          <span>Name:</span>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>
        <div className="button-container">
          <button type="submit" disabled={!inputValue.trim()}>
            Submit
          </button>
        </div>
      </form>
    </Container>
  );
}

export default Modal;
