
import React, { useEffect, useState } from 'react';
import "./QuoraDefaultBox.css";
import { Avatar } from "@mui/material";
import db, { auth } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/counter/userSlice";
import firebase from "firebase/compat/app";

function QuoraDefaultBox({ selectedTitle }) {
  const [Question, setquestion] = useState("");
  const user = useSelector(selectUser);
  const [student, setStudent] = useState(null);

  const handleQuestion = () => {
    if (Question !== "") {
      db.collection("question").add({
        question: Question,
        timeStamp: firebase.firestore.Timestamp.now(),
        userId: student.semester,
        displayName: student.name,
        userImg: user.photo,
        category: selectedTitle, // Include the selected category
      });
      setquestion("");
    } else {
      alert("Please enter a question");
    }
  };
  useEffect(() => {
    // Fetch student details based on rollNumber
    db.collection('students')
      .doc(auth.currentUser.email.split("@")[0])
      .get()
      .then((doc) => {
        if (doc.exists) {
          setStudent(doc.data());
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, [auth.currentUser.email.split("@")[0]]);

  if (!student) {
    return <div></div>;
  }

  return (
    <div className="Quora-Box">
      <Avatar src={auth.currentUser.photoURL} className="quora-avatar" />
      <div className="QuoraBox-Info">
        <input
          type="text"
          value={Question}
          onChange={(e) => setquestion(e.target.value)}
          placeholder="Share something..."
          className="quora-input"
        />
      </div>
      <button type="button" onClick={handleQuestion} >
        Post
      </button>
    </div>
  );
}

export default QuoraDefaultBox;
