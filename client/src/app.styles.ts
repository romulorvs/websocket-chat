import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;

  .messages-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
  }

  h2 {
    font-size: 32px;
    font-weight: 500;
  }

  h3 {
    font-size: 18px;
    font-weight: 300;
    margin-top: 8px;
  }

  &:after {
    content: "";
    min-height: 216px;
  }
`;

const ZIndexes = {
  input_form: 1,
  modal: 2,
  connection_modal: 3
}

export const getZIndex = (attr: keyof typeof ZIndexes) => {
  return ZIndexes[attr]
}