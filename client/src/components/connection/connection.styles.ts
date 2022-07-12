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
`;
