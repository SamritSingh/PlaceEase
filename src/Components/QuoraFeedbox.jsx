import { Avatar, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./QuoraFeedBox.css";
import { useDispatch, useSelector } from "react-redux";
import {
  CommentOutlined,
  CommentRounded,
  Padding,
  ShareOutlined,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";
import ReactModal from "react-modal";
import {
  selectQuestionId,
  selectQuestionName,
  setQuestionInfo,
} from "../features/counter/questionSlice";
import { auth } from "../firebase";
import db from "../firebase";
import { selectUser } from "../features/counter/userSlice";
import firebase from "firebase/compat/app";

function QuoraFeedbox(props) {
  const [open, setOpen] = useState(false);
  const [AnswerVal, setAnswerVal] = useState("");
  const [InputUrl, setInputUrl] = useState("");
  const [GetAnswer, setGetAnswer] = useState([]);
  const dispatch = useDispatch();
  const questionId = useSelector(selectQuestionId);
  const questionName = useSelector(selectQuestionName);
  const user = useSelector(selectUser);

  const [Like, setLike] = useState(false);
  const [LikeCount, setLikeCount] = useState(props.postLike);
  const [student, setStudent] = useState(null);

  const handleLike = () => {
    if (questionId) {
      if (!Like) {
        setLike(true);
        setLikeCount(LikeCount + 1);
        db.collection("question")
          .doc(questionId)
          .update({
            postLike: firebase.firestore.FieldValue.increment(1),
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      } else {
        setLike(false);
        setLikeCount(LikeCount - 1);
        db.collection("question")
          .doc(questionId)
          .update({
            postLike: firebase.firestore.FieldValue.increment(1),
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      }
    }
  };

  useEffect(() => {
    if (questionId) {
      db.collection("question")
        .doc(questionId)
        .collection("answer")
        .onSnapshot((querySnapshot) => {
          const AnswerData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            answer: doc.data(),
          }));
          setGetAnswer(AnswerData);
        });
    }
  }, [questionId]);

  const modalSave = (e) => {
    e.preventDefault();
    if (AnswerVal !== "") {
      if (questionId) {
        db.collection("question").doc(questionId).collection("answer").add({
          answer: AnswerVal,
          timeStamp: firebase.firestore.Timestamp.now(),
          questionId: props.id,
          userId: student.semester,
          displayName: student.name,
          userImg: user.photo,
        });
        setAnswerVal("");
        document.getElementById("quora").style.filter = "blur(0px)";
        setOpen(false);
      }
    } else {
      alert("Please enter your answer");
    }
  };

  const answerBtn = () => {
    document.getElementById("quora").style.filter = "blur(8px)";
    setOpen(true);
  };

  const modalCancel = () => {
    document.getElementById("quora").style.filter = "blur(0px)";
    setOpen(false);
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
    <div
      className="Profile-FeedBox"
      onClick={() => {
        dispatch(
          setQuestionInfo({
            questionId: props.id,
            questionName: props.question,
          })
        );
      }}
    >
      <div className="profile-info">
        <Avatar src={props.userImg} />
        <div className="profile-info-text">
          <h3 className="name">{props.displayname}</h3>
          <h3 className="semester">Semester: {props.userId}</h3>
        </div>
        

        <div className="time">
          <p>{new Date(props.PostTime?.toDate()).toLocaleString().replace(","," - ")}</p>
        </div>
      </div>
      <div className="Question-feedbox">
        <h3>{props.question}</h3>
        
      </div>
      <div className="post__answer">
        {GetAnswer.map(({ id, answer }) => (
          <div key={id} className="answer">
            {props.id === answer.questionId ? (
              <div >
                <div className="PostUser-Profile">
                  <Avatar  className="AvatarBelow" src={answer.userImg}  />
                  <h4>{answer.displayName}</h4>
                  <h4>Semester: {answer.userId}</h4>
                  <p >
                    {answer.timeStamp
                      ? new Date(answer.timeStamp?.toDate()).toLocaleString().replace(","," - ")
                      : ""}
                  </p>
                </div>
                <p className="para" >{answer.answer}</p>

              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>

      <div className="Feed-footer">
        <div className="vote">
          <div className="Upvote" onClick={handleLike}>
            <ThumbUpOutlined />
            <h4>{LikeCount}</h4>
          </div>
          
        </div>
        <div className="Share">
          <CommentRounded/>
          <button onClick={answerBtn}>Answer</button>
         </div>
          <ReactModal
           isOpen={open}
          onRequestClose={() => {
            setOpen(false);
          }}
          shouldCloseOnOverlayClick={false}
          style={{
            backgroundColor:"black",
            overlay: {
              width: "61%",
              height: "18%",
              backgroundColor: "black",
              margin:"auto",
              alignItems:"center",
              border:"2px solid black",
              
            },
            content: {
              
              outline: "none",
              margin: "-40px",
            },
          }}
        >
        <div className="modal-ans">
            
            <input
              required
              type="text"
              value={AnswerVal}
              onChange={(e) => {
                setAnswerVal(e.target.value);
              }}
              placeholder="Start writing here..."
            />
            <div className="modal-btn">
             
              <button type="submit" onClick={modalSave}>
              Save
             </button>
             <button onClick={modalCancel}>Cancel</button>
            </div>
          </div>
          
         </ReactModal>
      </div>
    </div>
  );
}

export default QuoraFeedbox;
