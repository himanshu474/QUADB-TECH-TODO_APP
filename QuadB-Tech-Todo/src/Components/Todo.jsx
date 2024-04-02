import { useDispatch } from "react-redux";
import {
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { toggleTodo, deleteTodo } from "../redux/todosSlice";

const Todo = ({ id, text, completed }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(id));
  };

  return (
    <ListItem
      button
      onClick={handleToggle}
      style={{ textDecoration: completed ? "line-through" : "none" }}
    >
      <ListItemIcon>
        <Checkbox checked={completed} />
      </ListItemIcon>
      <ListItemText primary={text} />
      <ListItemIcon>
        <Delete onClick={handleDelete} />
      </ListItemIcon>
    </ListItem>
  );
};

export default Todo;
