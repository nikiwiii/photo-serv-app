import './App.css';
import { useState } from 'react';

function App() {
  const [pictures, updatePictures] = useState([]);
  const [ipValue, setIp] = useState('192.168.x.xx');

  const getShit = async() => {
    if (!ipValue.includes('x')){
      let response = await fetch('http://' + ipValue + ':3001/getFiles', { method: "GET"})
      var val = await response.json()
      updatePictures(val.files)
      console.log(pictures);
    }  
    else {
      alert('wpisz swoje ip')
    }
  }
  return (
    <div className="App">
      <input type='text' defaultValue={ipValue} onChange={(e) => {setIp(e.target.value)}}></input>
      <button onClick={getShit}>Refresh/Load pictures</button>
      <div className='file-container'>
      {
        pictures.map((e, i) => {
          return(
          <div className='Pic' key={i}>
            <p>{e.name}</p>
            <img src={require('./server/upload/' + e.name)}></img>
          </div>)
        })
      }
      </div>
    </div>
  );
}

export default App;
