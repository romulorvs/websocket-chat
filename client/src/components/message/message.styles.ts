import styled, { css } from "styled-components";

interface ContainerProps {
  rightSide?: boolean;
  shrink?: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  margin-bottom: 16px;

  .avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    min-width: 40px;
    min-height: 40px;
    max-height: 40px;
    background-color: #222222;
    color: white;
    text-transform: uppercase;
    font-size: 16px;
    margin-right: 16px;
  }

  ${(props) =>
    props.rightSide
      ? css`
          flex-direction: row-reverse;

          .avatar {
            margin-left: 16px;
            margin-right: unset;
          }
        `
      : ""}

  ${(props) =>
    props.shrink && !props.rightSide
      ? css`
          padding-right: 56px;
        `
      : ""}

  ${(props) =>
    props.shrink && props.rightSide
      ? css`
          padding-left: 56px;
        `
      : ""}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: white;
  padding: 16px;
  border-bottom: 2px solid #e3e3e3;

  p {
    font-size: 11px;
    font-weight: 300;
    margin-bottom: -8px;
    margin-top: 12px;
    color: #bfbfbf;
  }
`;
