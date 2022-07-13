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
  z-index: ${getZIndex("input_form")};

  .input-container {
    display: flex;
    position: relative;
    flex-direction: column;
    flex-grow: 1;
    max-width: 900px;
    margin: 0 auto;

    .users-typing {
      display: flex;
      align-items: center;
      position: absolute;
      top: -21px;
      left: -4px;
      transform: translateY(-100%);
      z-index: ${getZIndex("users_typing")};
      font-size: 14px;
      color: #959595;
      font-weight: 100;
      font-style: italic;
      background-color: #f1f1f1;
      border-radius: 0px;
      padding-right: 14px;
      height: 44px;
      max-height: 44px;

      svg {
        width: 36px;
        height: 36px;
        margin-right: 4px;
      }
    }

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
        bottom: -27px;
        right: 42px;
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

      &:not(:focus-within) span {
        opacity: 0;
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
