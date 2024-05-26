import React, { useState, useEffect } from 'react';
import './Feed.css';
import QuoraDefaultBox from './QuoraDefaultBox';
import QuoraFeedbox from './QuoraFeedbox';
import db from '../firebase';

function Feed({ selectedTitle }) {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('question')
      .where('category', '==', selectedTitle) // Fetch feed based on selected title
      .orderBy('timeStamp', 'desc')
      .onSnapshot((snapshot) => {
        const feedData = snapshot.docs.map((doc) => ({ id: doc.id, question: doc.data() }));
        setFeed(feedData);
      });

    return () => {
      unsubscribe(); // Unsubscribe from the snapshot listener when the component unmounts
    };
  }, [selectedTitle]);

  return (
    <div className='Feed'>
      {feed.map(({ id, question }) => (
        <QuoraFeedbox
          key={id}
          id={id}
          PostTime={question.timeStamp}
          postDisLike={question.postDisLike}
          postLike={question.postLike}
          question={question.question}
          userImg={question.userImg}
          PostImg={question.PostImg}
          displayname={question.displayName}
          userId = {question.userId}
        />
      ))}
    </div>
  );
}

export default Feed;
