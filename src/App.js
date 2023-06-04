import './App.css';
import { useState } from 'react';

function App() {
  const [pictures, updatePictures] = useState([]);
  const [ipValue, setIp] = useState('192.168.x.xx');
  const [selects, setSelects] = useState([]);

  const getShit = async() => {
    if (!ipValue.includes('x')){
      const response = await fetch('http://' + ipValue + ':3001/getFiles', { method: "GET"})
      const val = await response.json()
      updatePictures(val.files)
      setSelects([])
      console.log(pictures);
    }  
    else {
      alert('wpisz swoje ip')
    }
  }
  const addSelect = (id) => {
    setSelects(() => selects.includes(id) ? selects.filter((e) => e !== id) : [...selects, id])//pictures[id]
  }
  const clearSelect = () => {
    setSelects([])
  }
  const selectAll = () => {
    setSelects(Array.from(
      { length: pictures.length },
      (_, index) => index
      ))
  }
  const delOne = async(id) => {
    if (!ipValue.includes('x')){
      await fetch('http://' + ipValue + ':3001/deleteSth', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: id}),
      }).then(() => getShit())
    }  
    else {
      alert('wpisz swoje ip')
    }
  }
  const delSelects = async() => {
    if (!ipValue.includes('x')){
      console.log(selects.length);
      await fetch('http://' + ipValue + ':3001/deleteSelects', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ids: selects}),
        })
        .then(() => getShit())
      }  
      else {
        alert('wpisz swoje ip')
      }
  }
  const rename = async(originalName) => {
    if (!ipValue.includes('x')){
      updatePictures([])
        const newName = prompt('podaj nową nazwę (pamietaj o formacie): ')
        await fetch('http://' + ipValue + ':3001/newName', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({original: originalName, new: newName}),
        })
        .then(() => getShit())
      }  
      else {
        alert('wpisz swoje ip')
      }
  }
  return (
    <div className="App">
      <div className='top'>
        <input className='input-top' type='text' defaultValue={ipValue} onChange={(e) => {setIp(e.target.value)}}></input>
        <button onClick={getShit} className='refresh-btn'>Refresh/Load pictures</button>
        <input className='selects' type='text' value={'selected: ' + (selects.length !== 0 ? selects : 'click image to select')} readOnly></input>
        <div className='top-btns'>
          <button onClick={selectAll}>Select all</button>
          <button onClick={clearSelect}>Clear</button>
        </div>
        <button className='rm-selected' onClick={delSelects}>Remove Selected</button>
      </div>
      <div className='file-container'>
      {
        pictures.length !== 0 ?
        pictures.map((e, i) => {
          return(
          <div className={'Pic ' + (selects.includes(i) ? 'on' : 'off')} key={i}>
            <p><b>{i + ':'}&nbsp;</b>{e}</p>
            <img src={require('./server/upload/' + e)} onClick={() => addSelect(i)} alt=''></img>
            <button onClick={() => delOne(i)}>DELETE</button>
            <button onClick={() => rename(e)}>RENAME</button>
          </div>)
        }) : <div className='not-connected'><p>WRITE YOUR IP AND REFRESH</p><img src={require('./dino.gif')}></img></div>
      }
      </div>
    </div>
  );
}

export default App;
