import styled from "styled-components";
import { getZIndex } from "../../app.styles";

export const Form = styled.form`
  display: flex;
  align-items: stretch;
  padding: 20px;
  border-top: 1px solid #e5e5e5;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background-color: #f1f1f1;
  z-index: ${getZIndex('input_form')};

  .input-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: 900px;
    margin: 0 auto;

    .textarea-container {
      display: flex;
      flex-grow: 1;
      position: relative;
      width: 100%;

      textarea {
        display: flex;
        flex-grow: 1;
        background-color: transparent;
        resize: none;
        background-color: white;
        box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.04);
        border-radius: 2px;
        padding: 10px;
        font-size: 15px;
      }

      span {
        position: absolute;
        bottom: 8px;
        right: 8px;
        font-size: 11px;
        font-style: italic;
        font-weight: 100;
        color: #959595;
        opacity: 0;
        transition: 0.3s opacity linear;

        &.show {
          opacity: 1;
        }
      }
    }

    .button-container {
      display: flex;
      justify-content: flex-end;

      button {
        margin-top: 8px;

        svg {
          width: 23px;
          height: 26px;
          fill: #222222;
        }

        &:disabled svg {
          fill: #b9b9b9;
        }
      }
    }
  }
`;
