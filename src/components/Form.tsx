import React, { useState } from 'react';
import './Form.css';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import converter from 'number-to-words';




const Result = ( {result} : { result: string }) => {
  return(
    <div className = "result">
      <span>{result}</span>
    </div>
    )
}


function Form() {

  const initMessage = "Please enter a number";

  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [message, setMessage] = useState(initMessage);
 
  const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedInput =  parseInt(input);
    if( !Number.isNaN(parsedInput)){
      const numbersInWords = converter.toWords(parsedInput);
      setResult(numbersInWords)
      setMessage(initMessage);
      setInput('')
    } else {
      setMessage('Invalid input, please enter only numbers');
      setInput('');
    }
  }


  
 
  return (
  <>
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <FormControl className="input">
        <InputLabel id="number" error={message !== initMessage} htmlFor="number">{message}</InputLabel>
        <Input id="number" value={input} onChange={(e) => setInput(e.target.value)}/>
      </FormControl>
      <Button
        id="submit_button"
        type = "submit"
      >
      submit
      </Button>
    </form> 

    <Result result={result}/>
    </>
  );
}



export default Form;