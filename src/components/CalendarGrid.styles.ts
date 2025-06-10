import styled, { css } from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto repeat(6, 120px);
  gap: 1px;
  background-color: #ccc;
  padding: 4px;
  border-radius: 8px;
`;

export const WeekDayHeader = styled.div`
  text-align: center;
  font-weight: bold;
  padding: 10px 0;
  background-color: green;
  line-height: 1.2;
`;

export const DayCellDiv = styled.div<{
  // isEmpty: boolean;
  isDragOver?: boolean;
  isCurrentMonth?: boolean;
}>`
  background-color: #f0f0f0;
  color: black;
  padding: 4px;
  position: relative;
  font-size: 14px;
  cursor: pointer;

  .day-number {
    font-weight: bold;
    text-align: right;
  }

  ${({ isCurrentMonth }) =>
    !isCurrentMonth &&
    css`
      background: grey;
      color: white;
      opacity: 0.7;
    `}
  ${({ isDragOver }) =>
    isDragOver &&
    css`
      outline: 2px solid #1976d2;
      background: orange;
    `}
`;

export const TaskList = styled.div`
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const TaskItem = styled.div`
  background-color: #e0f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TaskInputWrapper = styled.div`
  margin-top: 4px;

  input {
    width: 100%;
    font-size: 12px;
    padding: 2px;
  }
`;

export const FilterWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  gap: 60px;

  .selector-wrapper {
    padding: 2px;
    display: flex;
    gap: 16px;
  }

  .input-wrapper {
    display: flex;
    gap: 16px;
    width: 100%;
    font-size: 12px;
    padding: 2px;

    label {
      white-space: nowrap;
      font-size: 18px;
      display: flex;
      align-items: center;
    }
  }
`;
