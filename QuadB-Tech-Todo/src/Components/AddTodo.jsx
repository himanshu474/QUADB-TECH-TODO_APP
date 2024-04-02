import { useDispatch } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { addTodo } from "../features/todosSlice";

const AddTodo = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      dispatch(
        addTodo({
          id: uuidv4(),
          text: text.trim(),
          completed: false,
        })
      );
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Add Todo Task"
        variant="outlined"
        value={text}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </form>
  );
};

export default AddTodo;
