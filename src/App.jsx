import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [memos, setMemos] = useState([]);
  const [newMemo, setNewMemo] = useState('');

  useEffect(() => {
    fetch('http://18.119.44.196:8000/api/memos/')
      .then(response => response.json())
      .then(data => setMemos(data))
      .catch(error => console.error('Error fetching memos:', error));
  }, []);

  const handleAddMemo = () => {
    if (newMemo.trim()) {
      fetch('http://18.119.44.196:8000/api/memos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMemo })
      })
        .then(response => response.json())
        .then(data => {
          setMemos([...memos, data]);
          setNewMemo('');
        })
        .catch(error => console.error('Error adding memo:', error));
    } else {
      alert('Memo content cannot be empty');
    }
  };

  const handleDeleteMemo = (id) => {
    fetch(`http://18.119.44.196:8000/api/memos/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setMemos(memos.filter(memo => memo.id !== id));
      })
      .catch(error => console.error('Error deleting memo:', error));
  };

  return (
    <div className="App">
      <h1>Memo App</h1>
      <input
        type="text"
        value={newMemo}
        onChange={e => setNewMemo(e.target.value)}
        placeholder="Add a new memo"
      />
      <button onClick={handleAddMemo}>Add Memo</button>
      <ul>
        {memos.map(memo => (
          <li key={memo.id}>
            {memo.content}
            <button onClick={() => handleDeleteMemo(memo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
