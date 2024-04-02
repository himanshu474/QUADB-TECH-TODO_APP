import { Stack, Typography } from "@mui/material";
import React from "react";
import TodoItem from "./TodoItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, clearTodo, editTodo } from "../store/TodoReducer";
const Todo = () => {
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState("");
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoList);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing && editingId) {
      dispatch(editTodo({ id: editingId, text }));
      setEditingId(null);
    } else {
      dispatch(addTodo(text));
    }
    setText("");
    setIsEditing(false);
  };
  const handleEdit = (id, newText) => {
    setIsEditing(true);
    setEditingId(id);
    setText(newText);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(todoList));
  }, [todoList]);
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      sx={{
        width: {
          xs: "90%",
          sm: "60%",
          md: "50%",
          lg: "40%",
          xl: "30%",
        },
        padding: {
          xs: "1rem",
          sm: "1.5rem",
          md: "5rem",
        },

        bgcolor: "#4287f5",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Fab
        aria-label="add"
        sx={{ position: "absolute", bottom: 0, right: 0, bgcolor: "#00DDFF" }}
      >
        <AddIcon sx={{ color: "indigo" }} />
      </Fab>
      <Typography
        variant="h3"
        component="h6"
        color={"#9df9ef"}
        width={"100%"}
        sx={{
          fontSize: {
            xs: "1.5rem", // < 600px
            sm: "2rem", // >= 600px
          },
        }}
      >
        Todo List with Redux
      </Typography>
      <Stack flexDirection={"row"} sx={{ width: "100%" }}>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", display: "flex" }}
        >
          <TextField
            id="outlined-basic"
            label={isEditing ? "Edit task" : "Add New Task"}
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ width: "80%" }}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ width: "20%", height: "100%", color: "white" }}
          >
            {isEditing ? "edit" : "Add"}
          </Button>
        </form>
      </Stack>
      <Stack sx={{ width: "100%" }} spacing={2}>
        {todoList.map((item) => (
          <TodoItem key={item.id} {...item} handleEdit={handleEdit} />
        ))}
      </Stack>
      <Button
        variant="contained"
        onClick={() => dispatch(clearTodo())}
        sx={{ width: "100%", color: "white" }}
      >
        Clear all
      </Button>
    </Stack>
  );
};

export default Todo;
