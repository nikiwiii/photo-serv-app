import './App.css';
import { useState } from 'react';

function App() {
  const [pictures, updatePictures] = useState([]);
  const [ipValue, setIp] = useState('192.168.x.xx');
  const [selects, setSelects] = useState([]);

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
  const addSelect = (id) => {
    selects.includes(id) ? setSelects(() => {return [...selects, id]}) : null//pictures[id]
    console.log(selects);
  }
  return (
    <div className="App">
      <div className='top'>
        <input className='input-top' type='text' defaultValue={ipValue} onChange={(e) => {setIp(e.target.value)}}></input>
        <button onClick={getShit} className='refresh-btn'>Refresh/Load pictures</button>
        <input className='selects' type='text' value={'selected: ' + selects} readOnly></input>
      </div>
      <div className='file-container'>
      {
        pictures.map((e, i) => {
          return(
          <div className='Pic' key={i} onClick={() => addSelect(i)}>
            <p><b>{i + ':'}&nbsp;</b>{e.name}</p>
            <img src={require('./server/upload/' + e.name)}></img>
            <button>DELETE</button>
            <button>RENAME</button>
          </div>)
        })
      }
      </div>
    </div>
  );
}

export default App;
