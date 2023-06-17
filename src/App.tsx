import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateItem } from './store';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import './App.css'

interface Item {
  id: number;
  title: string;
  category: string;
  date: string;
  description: string;
}

const App: React.FC = () => {
  const items = useSelector((state: any) => state.items.items);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<Item>({
    id: 0,
    title: '',
    category: '',
    date: '',
    description: '',
  });

  const { title, category, date, description } = formData;

  const handleAdd = () => {
    const newItem: Item = {
      id: Date.now(),
      title,
      category,
      date,
      description,
    };
    dispatch(addItem(newItem));
    setFormData({
      id: 0,
      title: '',
      category: '',
      date: '',
      description: '',
    });
  };

  const handleRemove = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleEdit = (id: number) => {
    const editedItem = items.find((item: Item) => item.id === id);
    if (editedItem) {
      const updatedTitle = prompt('Enter the updated title:', editedItem.title);
      const updatedCategory = prompt('Enter the updated category:', editedItem.category);
      const updatedDate = prompt('Enter the updated date:', editedItem.date);
      const updatedDescription = prompt('Enter the updated description:', editedItem.description);
      if (updatedTitle && updatedCategory && updatedDate && updatedDescription) {
        dispatch(
          updateItem({
            ...editedItem,
            title: updatedTitle,
            category: updatedCategory,
            date: updatedDate,
            description: updatedDescription,
          })
        );
      }
    }
  };

  return (
    <div className="container">
      <div className='card-container'>
      <div className="card">
        <h2>Add Item</h2>
        <div className="form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
          />
          <input
            type="text"
            placeholder="Date"
            value={date}
            onChange={e => setFormData({ ...formData, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
          <button className = "form-btn" onClick={handleAdd}>Add</button>
        </div>
      </div>
      </div>
      <div className="card-list">
        <h2>Items List</h2>
        <ul>
          {items.map((item: Item) => (
            <li key={item.id} className='list-container'>
              <div className='list-header'>
              <div>
              <h2>{item.title}</h2>
              <p>{item.category}</p>
              </div>
              
              <h2 className='list-date'>{item.date}</h2>
              </div>
              <div className='list-body'>
              
              <p>{item.description}</p>
              <div className='list-icons'>
              <EditIcon onClick={() => handleEdit(item.id)} color = "success"/>
              <DeleteForeverIcon onClick={() => handleRemove(item.id)} color='error'/>
              </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
