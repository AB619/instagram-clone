import React, { useState } from 'react';
import './ImageUpload.css';
import { Button } from '@material-ui/core';
import { db, storage } from './Firebase';
import firebase from 'firebase';

const ImageUpload = ({ username }) => {

    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    //const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        //console.log(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                //Error function
                console.log(error);
                alert(error.message);
            },
            () => {
                //complete function
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //post inside the db
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        });

                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    })
            }
        )
    }

    return (
        
        <div className="imageupload">
            <progress className="imageupload__progress" value={progress} max="100" />
            <input type="text"
                placeholder="Enter a caption..."
                onChange={event => setCaption(event.target.value)}
                value={caption} />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}> Upload </Button>
        </div>
    )
}

export default ImageUpload;
