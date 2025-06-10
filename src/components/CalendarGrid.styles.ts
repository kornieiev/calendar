import styled, { css } from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto repeat(6, 120px);
  gap: 4px;
  padding: 8px;
  border-radius: 8px;
  border: 2px solid white;
`;

export const WeekDayHeader = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 10px 0;
  line-height: 1.2;
`;

export const DayCellDiv = styled.div<{
  isDragOver?: boolean;
  isCurrentMonth?: boolean;
}>`
  background-color: rgba(255, 255, 255, 0.9);
  color: black;
  padding: 4px;
  position: relative;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;

  .day-number {
    font-weight: bold;
    text-align: left;
    margin-left: 4px;
    background: rgba(0, 0, 0, 0.05);
    width: fit-content;
    min-width: 10px;
    padding: 4px 8px;
    border-radius: 12px;
  }

  ${({ isCurrentMonth }) =>
    !isCurrentMonth &&
    css`
      background: rgba(255, 255, 255, 0.7);
      color: rgba(0, 0, 0, 0.9);
      opacity: 0.7;
    `}
  ${({ isDragOver }) =>
    isDragOver &&
    css`
      outline: 2px solid #1976d2;
      background: transparent;
      border: 3px solid white;
      outline: none;
    `}
`;

export const TaskList = styled.div`
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const TaskItem = styled.div<{ borderColor?: string }>`
  background: transparent;
  padding: 2px 4px;
  border-left: 5px solid ${({ borderColor }) => borderColor || "darkmagenta"};
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  input {
    outline: none;
    background: red;
  }
`;

export const TaskInputWrapper = styled.div`
  margin-top: 4px;

  .task-input {
    background: rgba(233, 106, 67, 0.5);
    width: 90%;
    color: black;
    font-size: 1rem;
    outline: none;
    border: none;
    border-radius: 4px;
    padding: 4px 8px;
  }

  input {
    width: 100%;
    font-size: 12px;
    padding: 2px;
  }
`;
export const MainWrapper = styled.div`
  border-radius: 8px;
  padding: 16px;

  background: linear-gradient(
    90deg,
    rgb(233, 197, 67) 0%,
    rgb(233, 106, 67) 100%
  );
`;

export const FilterWrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: row;
  gap: 60px;
  padding: 20px 40px;

  .selector-wrapper {
    padding: 2px;
    display: flex;
    gap: 16px;

    select {
      background-color: rgb(255, 255, 255, 0.5);
      border: none;
      border-radius: 8px;
      padding: 8px 16px;
      width: 140px;
      font-size: 1.4rem;
      color: rgba(0, 0, 0, 0.9);
    }
  }

  .input-wrapper {
    display: flex;
    gap: 16px;
    width: 100%;
    font-size: 18px;

    label {
      white-space: nowrap;
      font-size: 1.6rem;
      color: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
    }

    input {
      background-color: rgb(255, 255, 255, 0.5);
      border: none;
      border-radius: 8px;
      padding: 8px 16px;
      width: 100%;
      font-size: 1.4rem;
      color: rgba(0, 0, 0, 0.9);
    }
  }
`;
