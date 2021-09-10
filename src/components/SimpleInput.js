import {useState} from 'react';

const SimpleInput = (props) => {
  const [input, setInput] =useState('');



  const inputHandler=(event)=>{
  setInput(event.target.value);

  }

  const submitHandler=(event)=>{
  event.preventDefault();

 if(input.trim().length === 0){
   return;
 }
  console.log(input);

  setInput('');
  }
  return (
    <form>
      <div className='form-control'>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' value={input} onChange={inputHandler}/>
      </div>
      <div className="form-actions">
        <button onClick={submitHandler}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
