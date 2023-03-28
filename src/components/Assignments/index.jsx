


import { useState } from 'react';
import {storage } from '../../services/firebase';
  
function Assignments() {
  
  const [doc, setDoc] = useState('');
  const [Url, setUrl] = useState('');
  const [data, setData] =useState('');
  
  const upload = () => {
    if (doc == null)
      return;
    setUrl("Getting Download Link...")
  
    // Sending File to Firebase Storage
    storage.ref(`/docs/${doc.name}`).put(doc)
      .on("state_changed", alert("success"), alert, () => {
  
        // Getting Download Link
        storage.ref("docs").child(doc.name).getDownloadURL()
          .then((url) => {
            setUrl(url);
          })
      });
  }

  // List All Files
  const listItem = () => {
    storage.ref().child('docs/').listAll()
      .then(res => {
        res.items.forEach((item) => {
          setData(arr => [...arr, item.name]);
        })
      })
      .catch(err => {
        alert(err.message);
      })
  }
  
  return (
    <div className="App" style={{ marginTop: 250 }}>
      <center>
        <input type="file" 
        onChange={(e) => { setDoc(e.target.files[0]) }} />
        <button onClick={upload}>Upload</button>
        <br />
        <p><a href={Url}>{Url}</a></p>
        <br /><br /><br /><br /><br /><br />
        <button onClick={listItem}>List Item</button>
        <br /><br />
        {
          data.map((val) => (
            <h2>{val}</h2>
          ))
}
      </center>
    </div>
  );
}
  
export { Assignments};