import React, { useState } from 'react';

import './App.css';

function App() {

  // React hooks for having and setting state.
  const [item_name, setItemName] = useState('');
  const [item_desc, setItemDesc] = useState('');
  const [item_quantity, setItemQuantity] = useState(1);

  const [cart_list, addToCartList] = useState([]);

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  }

  const handleItemDesChange = (event) => {
    setItemDesc(event.target.value);
  }

  const handleItemQuantityChange = (event) => {
    setItemQuantity(event.target.value);
  }

  const handleAddToList = (event) => {
    if (item_name === "") {
      return;
    }
    addToCartList([...cart_list, { item_name, item_desc, item_quantity }]);
  }

  const handleClearAll = (event) => {
    event.preventDefault();
    addToCartList([]);
  }

  const handleCancel = (event) => {
    event.preventDefault();
    setItemName('');
    setItemDesc('');
    setItemQuantity(1);
  }

  const handleItemRemove = (element) => {
    const cartList = [...cart_list]; //present state
    const indexToDelete = cartList.indexOf(element);

    cartList.splice(indexToDelete, 1);

    addToCartList([...cartList]);

  }

  const listHeader = (cart_list.length === 0 ?
    <h2>Shopping List</h2> :
    <h2 className="listHeader">{cart_list.length} {cart_list.length > 1 ? "items" : "item"}
      <button onClick={handleClearAll} class="btn-clear-all">clear all</button></h2>);

  return (
    <div className="App" >
      <div className="shopping__list">
        {listHeader}
        <hr />
        {cart_list.length === 0 && <p>There are no items in your list.</p>}
        {
          cart_list.map((elem, key) => {
            return (
              <div key={key} className="display__item">
                <p className="display__item--name">{elem.item_quantity} x {elem.item_name}</p>
                <p className="display__item--desc">{elem.item_desc}</p>
                <p className="display__item--remove">
                  <button className="btn--remove" name="remove" onClick={() => handleItemRemove(elem)}>remove</button>
                </p>
              </div>
            )
          })}
      </div>
      <div className="add__item">
        <h2>Add new item</h2>
        <hr />
        <form method="POST" action="javascript:void(0);">
          <p>Name*</p>
          <input
            type="text"
            placeholder="Enter name"
            name="item_name"
            value={item_name}
            onChange={handleItemNameChange}
            required />
          <p>Description*</p>
          <textarea
            placeholder="Enter name"
            rows="4"
            name="item_description"
            value={item_desc}
            onChange={handleItemDesChange}
          />
          <p>Quantity</p>
          <input
            type="number"
            min="1"
            default="1"
            name="item_quantity"
            value={item_quantity}
            onChange={handleItemQuantityChange}
            required />
          <hr />
          <button type="submit" onClick={handleAddToList} className="add">Add to list</button>
          <button type="reset" onClick={handleCancel} className="cancel">cancel</button>
        </form>
      </div>
    </div>
  );
}


export default App;
