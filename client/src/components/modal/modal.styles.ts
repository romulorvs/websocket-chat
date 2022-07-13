import styled from "styled-components";
import { getZIndex } from "../../app.styles";

export const Container = styled.div`
  position: fixed;
  z-index: ${getZIndex("modal")};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 60px;
    border-radius: 4px;

    h2 {
      margin-bottom: 32px;
      text-align: center;
      border-bottom: 1px solid #efefef;
      padding-bottom: 32px;
    }

    label {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;

      span {
        font-size: 14px;
        font-weight: 300;
        margin-bottom: 4px;
      }

      input {
        min-width: 300px;
        font-size: 14px;
        padding: 12px;
        background-color: #efefef;
        border-bottom: 2px solid #dbdbdb;
      }
    }

    .button-container {
      display: flex;
      justify-content: end;

      button {
        background-color: #222222;
        color: white;
        padding: 10px 16px;
        border-radius: 3px;

        &:active {
          background-color: #3a3a3a;
        }

        &:disabled {
          background-color: #efefef;
          color: #b1b1b1;
        }
      }
    }
  }
`;
