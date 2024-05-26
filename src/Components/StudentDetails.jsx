// StudentDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import './StudentDetails.css'; // Import CSS file

function StudentDetails() {
  const { rollNumber } = useParams(); // Extract rollNumber from URL params
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // Fetch student details based on rollNumber
    db.collection('students')
      .doc(rollNumber)
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
  }, [rollNumber]);

  if (!student) {
    return <div></div>;
  }

  return (
    <div className='whole'> 
    <div className="student-details-container">
      <h1>Student Details</h1>
      <div className="student-details-item">
        <strong>Name:</strong> 
        <h2>{student.name}</h2>
      </div>
      <div className="student-details-item">
        <strong>Roll Number:</strong> 
        <h2>{student.rollNumber}</h2>
      </div>
      <div className="student-details-item">
        <strong>Semester:</strong>
        <h2>{student.semester}</h2>
      </div>
      <div className="student-details-item">
        <strong>CGPA:</strong>
        <h2>{student.cgpa}</h2>
      </div>
      <div className="student-details-item">
        <strong>Specialization:</strong>
        <h2>{student.specialization}</h2>
      </div>
      <div className="student-details-item">
        <strong>Official email id:</strong>
        <h2>{student.email}</h2>
      </div>
      
    </div>
    </div>
  );
}

export default StudentDetails;
