import { useSelector } from "react-redux";
import { List } from "@material-ui/core";
import Todo from "./Todo";

const TodoList = () => {
  const todos = useSelector((state) => state.todos.todos);

  return (
    <List>
      {todos.map((todo) => (
        <Todo key={todo.id} text={todo.text} completed={todo.completed} />
      ))}
    </List>
  );
};

export default TodoList;
