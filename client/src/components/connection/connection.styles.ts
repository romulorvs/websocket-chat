import styled from "styled-components";
import { getZIndex } from "../../app.styles";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${getZIndex("connection_modal")};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.6);

  h2 {
    color: white;
    font-weight: 500;
  }

  h3 {
    color: rgba(255, 255, 255, 0.6);
    font-weight: 300;
  }

  svg {
    width: 80px;
    height: 80px;
  }
`;
