import React, { useState } from "react";
import { generateCalendarGrid } from "../utils/generateCalendarGrid";
import type { DayCell, Task } from "../types/index";
import { v4 as uuidv4 } from "uuid";
import {
  GridContainer,
  WeekDayHeader,
  DayCellDiv,
  TaskList,
  TaskItem,
  TaskInputWrapper,
  FilterWrapper,
  MainWrapper,
} from "./CalendarGrid.styles";

interface Props {
  year: number;
  month: number;
  setSelectedDate: React.Dispatch<React.SetStateAction<[number, number]>>;
  countries: { countryCode: string; name: string }[];
  selectedCountry: string;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
  holidays: any[];
}

export const CalendarGrid: React.FC<Props> = ({
  year,
  month,
  setSelectedDate,
  countries,
  selectedCountry,
  setSelectedCountry,
  holidays,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingDate, setEditingDate] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskText, setEditingTaskText] = useState("");

  const [search, setSearch] = useState("");

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", taskId);
  };

  const handleDrop = (e: React.DragEvent, targetDate: string) => {
    e.preventDefault();

    const droppedTaskId = e.dataTransfer.getData("text/plain");
    if (!droppedTaskId) return;

    setTasks((prev) => {
      const draggedTask = prev.find((t) => t.id === droppedTaskId);
      if (!draggedTask) return prev;

      const tasksInTarget = prev
        .filter((t) => t.date === targetDate)
        .sort((a, b) => a.order - b.order);

      const maxOrder = tasksInTarget.length
        ? tasksInTarget[tasksInTarget.length - 1].order + 1
        : 0;

      return prev.map((task) =>
        task.id === droppedTaskId
          ? { ...task, date: targetDate, order: maxOrder }
          : task
      );
    });

    setDraggedTaskId(null);
  };

  const handleDragOver = (e: React.DragEvent, idx: number, cell: DayCell) => {
    e.preventDefault();
    if (cell.date) setDragOverIdx(idx);
  };
  const handleDragLeave = (cell: DayCell) => {
    if (cell.date) setDragOverIdx(null);
  };

  const days: DayCell[] = generateCalendarGrid(year, month);

  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;

  const handleAddTask = (date: string) => {
    if (inputText.trim() === "") return;
    const tasksInDate = tasks.filter((t) => t.date === date);
    const newTask: Task = {
      id: uuidv4(),
      text: inputText.trim(),
      date,
      order: tasksInDate.length,
      color: getRandomColor(),
    };
    setTasks((prev) => [...prev, newTask]);
    setInputText("");
    setEditingDate(null);
  };

  const tasksForDate = (date: string | null) =>
    tasks.filter(
      (task) =>
        task.date === date &&
        (!search.trim() ||
          task.text.toLowerCase().includes(search.toLowerCase()))
    );

  const handleTaskDrop = (e: React.DragEvent, targetTaskId: string) => {
    e.preventDefault();
    if (!draggedTaskId || draggedTaskId === targetTaskId) return;

    setTasks((prev) => {
      const draggedTask = prev.find((t) => t.id === draggedTaskId);
      const targetTask = prev.find((t) => t.id === targetTaskId);

      if (!draggedTask || !targetTask) return prev;
      if (draggedTask.date !== targetTask.date) return prev;

      const sameDayTasks = prev
        .filter((t) => t.date === draggedTask.date && t.id !== draggedTaskId)
        .sort((a, b) => a.order - b.order);

      const newList: Task[] = [];
      for (const t of sameDayTasks) {
        if (t.id === targetTask.id) {
          newList.push(draggedTask);
        }
        newList.push(t);
      }

      if (!newList.find((t) => t.id === draggedTask.id)) {
        newList.push(draggedTask);
      }

      return prev.map((task) => {
        if (task.date !== draggedTask.date) return task;
        const newIndex = newList.findIndex((t) => t.id === task.id);
        return newIndex !== -1 ? { ...task, order: newIndex } : task;
      });
    });

    setDraggedTaskId(null);
  };

  const handleEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTaskText(task.text);
  };

  const handleEditTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTaskText(e.target.value);
  };

  const handleEditTaskSave = (task: Task) => {
    if (editingTaskText.trim() === "") {
      setEditingTaskId(null);
      return;
    }
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, text: editingTaskText.trim() } : t
      )
    );
    setEditingTaskId(null);
  };

  return (
    <MainWrapper>
      <FilterWrapper>
        <div className='selector-wrapper'>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            style={{ marginRight: 8 }}
          >
            {countries.map((c) => (
              <option key={c.countryCode} value={c.countryCode}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={month}
            onChange={(e) => {
              const newMonth = Number(e.target.value);
              setSelectedDate([year, newMonth]);
            }}
          >
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((m, i) => (
              <option key={i} value={i}>
                {m}
              </option>
            ))}
          </select>
          <select
            value={year}
            onChange={(e) => {
              const newYear = Number(e.target.value);
              setSelectedDate([newYear, month]);
            }}
          >
            {Array.from({ length: 11 }, (_, i) => 2020 + i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div className='input-wrapper'>
          <label>Find Task:</label>
          <input
            type='text'
            placeholder='Find task...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </FilterWrapper>

      <GridContainer>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <WeekDayHeader key={day}>{day}</WeekDayHeader>
        ))}

        {days.map((cell, idx) => {
          const filteredTasks = tasksForDate(cell.date);
          const holiday = holidays.find((h) => h.date === cell.date);

          return (
            <DayCellDiv
              key={idx}
              isCurrentMonth={cell.isCurrentMonth}
              isDragOver={dragOverIdx === idx && !!cell.date}
              onDoubleClick={() => {
                if (cell.date) setEditingDate(cell.date);
              }}
              onDrop={(e) => {
                setDragOverIdx(null);
                return cell.date && handleDrop(e, cell.date);
              }}
              onDragOver={(e) => handleDragOver(e, idx, cell)}
              onDragLeave={() => handleDragLeave(cell)}
            >
              <div className='day-number'>{cell.label}</div>

              {/* Праздник */}
              {holiday && (
                <div className='holiday'>
                  {holiday.localName || holiday.name}
                </div>
              )}

              {/* Задачи */}
              <TaskList>
                {filteredTasks
                  .sort((a, b) => a.order - b.order)
                  .map((task) => (
                    <TaskItem
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleTaskDrop(e, task.id)}
                      onDoubleClick={() => handleEditTask(task)}
                      borderColor={task.color || "darkmagenta"}
                    >
                      {editingTaskId === task.id ? (
                        <input
                          type='text'
                          value={editingTaskText}
                          autoFocus
                          onChange={handleEditTaskChange}
                          onBlur={() => handleEditTaskSave(task)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleEditTaskSave(task);
                          }}
                          style={{ width: "90%" }}
                        />
                      ) : (
                        task.text
                      )}
                    </TaskItem>
                  ))}
              </TaskList>

              {/* Поле ввода задачи */}
              {!editingTaskId &&
                editingDate === cell.date &&
                editingDate !== null && (
                  <TaskInputWrapper onClick={(e) => e.stopPropagation()}>
                    <input
                      className='task-input'
                      type='text'
                      autoFocus
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onBlur={() => setEditingDate(null)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddTask(cell.date!);
                      }}
                    />
                  </TaskInputWrapper>
                )}
            </DayCellDiv>
          );
        })}
      </GridContainer>
    </MainWrapper>
  );
};
