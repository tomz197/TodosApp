import './AddTodoForm.css';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addTodo} from '../../actions/todos';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';

const AddTodoForm = () => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.length) {
      return;
    }
    fetch('http://localhost:8080/todo', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': localStorage.getItem('accessToken')
      },
      body: JSON.stringify({
        text: inputText,
      })
    }).then((res) => {
      console.log(res);
      return res.json();
    }).then((data) => {
      console.log(data);
      dispatch(addTodo(data));
    });
    setInputText("");
  }

  return (
    <Box component="form" className="AddTodoForm" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        id="inputText"
        label="Todo"
        name="Todo"
        InputProps={{
          endAdornment: (
            <IconButton
                type="submit"
                variant="contained"
              >
                <AddIcon/>
            </IconButton>
          )
        }}
      />
    </Box>
  );
}

export default AddTodoForm;