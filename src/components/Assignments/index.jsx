import { useState } from 'react';
import {storage} from '../../services/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
  
function Assignments() {
    const [file, setFile] = useState("");
 
    // progress
    const [percent, setPercent] = useState(0);
    const [allDocs,setDocs] =useState([]);
 
    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }
 
    const handleUpload = () => {
        if (!file) {
            alert("Please upload an assignment first!");
        }
 
        const storageRef = ref(storage, `/files/${file.name}`);
 
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);
 
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
 
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
    };
  const getFromFirebase = () => {
    //1.
    let storageRef = storage.ref();
    //2.
    storageRef.listAll().then(function (res) {
        //3.
        res.items.forEach((docRef) => {
          docRef.getDownloadURL().then((url) => {
              //4.
              setDocs((allDocs) => [...allDocs, url]);
          });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteFromFirebase = (url) => {
    //1.
    let pictureRef = storage.refFromURL(url);
   //2.
    pictureRef.delete()
      .then(() => {
        //3.
        setDocs(allDocs.filter((doc) => doc !== url));
        alert("Pdf is deleted successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };


 
    return (
        <div>
            <input type="file" onChange={handleChange} accept="/doc/*" />
            <button onClick={handleUpload}>Upload to Firebase</button>
            <p>{percent} "% done"</p>
             {allDocs.map((doc)=>{
                
                    <div key={doc} className="doc">
                        <doc src={doc} alt="" />
                        <button onClick={() => deleteFromFirebase(doc)}>Delete</button>
                    </div>
                
             })}
        </div>
        
         
    );
  
  
  
}  
export {Assignments};