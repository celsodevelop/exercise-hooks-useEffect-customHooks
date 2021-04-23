import React, { useState } from 'react';

function Greeting() {
  // substitua essa variável por uma variável no estado, utilizando useState
  const [name, setName] = useState('');

  function handleChange({target: { value: name }}) {
    setName(name)  
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  );
}

function App() {
  return <Greeting />;
}

export default App;
