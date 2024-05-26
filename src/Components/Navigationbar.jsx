
import { Link } from "react-router-dom"; // Import Link
import { Avatar, Button } from "@mui/material";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import Modal from "react-modal";
import { auth } from "../firebase";
import firebase from "firebase/compat/app";
import "./Navbar.css";
import db from '../firebase';

import {
  HomeOutlined,
} from "@mui/icons-material";


function Navigationbar() {
  const user = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [InputValue, setInputValue] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [student, setStudent] = useState(null);
  const handleQuestion = (e) => {
    // Your existing code for handling questions
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
    <div className="navbar">
      
      {/* Profile avatar with link to StudentDetails */}
      <Link to={"student.rollNumber" ? `/studentDetails/${student.rollNumber.split("@")[0]}` : "/"} className="profile-avatar-link">
        <Avatar  src={user.photo} />
      </Link>
      {/* Remaining navigation elements */}
      
        <div>
          <h2>Welcome, {student.name}</h2>
        </div>
        <div
          onClick={() => {
            auth.signOut();
          }}
          className="logout-btn"
        >
          <Button>Log Out</Button>
        </div>
      
      {/* Modal for adding questions */}
      {/* Your existing modal code */}
    </div>
  );
}

export default Navigationbar;
