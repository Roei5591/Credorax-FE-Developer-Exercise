import React, { useState } from 'react';
import './Form.css';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import converter from 'number-to-words';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';

interface history {
  number: string;
  time: string;
}

const History = ({history , removeFromHistory , setFromHistory} : {
  history: history[];
  removeFromHistory: (index: number) => void
  setFromHistory: (historyInput: string) => void
}) => {

const historyList = history.map((item,index) => { return <tr>
    <td onClick={() => setFromHistory(item.number)}>{item.number}</td>
    <td>{item.time}</td>
    <td > 
     <DeleteIcon onClick={ ()=> removeFromHistory(index)}/> 
    </td>
  </tr>
 }) 

 return (    
 <div className="history">
  <span> History</span>
  
  <table>
    <thead>
      <tr>
        <th>Number</th>
        <th>time</th>
        <th style={{visibility: "hidden"}}>remove</th>
      </tr> 
    </thead> 
    <tbody>
      {historyList}
    </tbody>
 </table>
</div>
)}



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
  const [history , setHistory] = useState<history[]>([]) 

  const removeFromHistory = (index: number) => {
    setHistory(prev => prev.filter((item , fIndex) => fIndex !== index))}

  //sets the number input on click of number in the history
  const setFromHistory = (historyInput: string) => {
    setResult('')
    setInput(historyInput);
  } 

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedInput =  parseInt(input);

    //check if the submitted input is a number
    if( !Number.isNaN(parsedInput)){
      const numbersInWords = converter.toWords(parsedInput);
      setResult(numbersInWords)
      setHistory(prev => [  {
        number: input , 
        time: moment(Date.now()).format('MMMM Do YYYY, hh:mm')
      } , ...prev])
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

    <History 
      history={history} 
      removeFromHistory={removeFromHistory}
      setFromHistory={setFromHistory}
      />
    </>
  );
}



export default Form;