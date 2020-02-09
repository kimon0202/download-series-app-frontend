import './../../styles/pages/Main.css';

import React, { useEffect, useState } from 'react';

import api from './../../services/api';

export default function Main() {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, [items]);

  async function getItems() {
    const response = await api.get('/entries');

    if(response.status === 200) {
      setItems(response.data);
    }
  }

  async function addtem(e) {
    e.preventDefault();

    const data = {
      title,
    }
    const response = await api.post('/entries', data);

    if(response.status === 200) {
      setItems([...items, response.data]);
      setTitle('');
    }
  }

  async function deleteItem(id, index) {
    await api.delete(`/entries/${id}`);

    let arr = items;
    arr.splice(index, 1);

    setItems(arr);
  }

  return (
    <div className="container">
      {items.length !== 0 && <ul className="download-list">
        {items.map((item, index) => {
          return (
            <li>
              <h3>{item.title}</h3>
              <span onClick={() => deleteItem(item._id, index)}>
                Delete
              </span>
            </li>
          );
        })}
      </ul>}
      
      <form className="add-item-form" onSubmit={addtem}>
        <div className="input">
          <label>Title</label>
          <input 
            type="text" 
            className="title-input" 
            autoCapitalize="words" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button type="submit">Add to List</button>
      </form>
    </div>
  )
}
