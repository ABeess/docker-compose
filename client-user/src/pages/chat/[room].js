import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { refreshToken } from 'src/fetching/auth.api';
import appSK from 'src/utils/feathersSocket';

export default function chat() {
  const { query } = useRouter();
  const [mess, setmess] = useState([]);
  const [text, setText] = useState('');

  const sub = async (e) => {
    e.preventDefault();
    appSK.io.emit('create', 'course-comment', {
      text: 'I really have to ' + text,
      courseId: query.room,
    });
    // await refreshToken({ payload: { _id: '62c4f0db18323ccf3a9dc915', role: ['admin'] }, login: true });
    // messages.create({ text });
  };
  useEffect(() => {
    console.log(query.room);
    appSK.io.emit('course-comment-join', {
      _id: query.room,
    });
    appSK.io.on('course-comment created', function (comment) {
      console.log('Got a new comment!', comment);
    });
    return () => {
      appSK.io.emit('course-comment-leave', {
        _id: query.room,
      });
    };
  }, []);
  return (
    <>
      <form onSubmit={sub}>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button type="submit">Send</button>
      </form>
      <ul>
        {mess?.map((item) => (
          <li>message</li>
        ))}
      </ul>
    </>
  );
}
