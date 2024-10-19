import { useState } from "react";
import { useEffect } from "react";

function Main() {
  const shoes = [
    {
      name: "Air Max 270",
      price: 150,
      img: "https://t3.ftcdn.net/jpg/06/12/00/18/360_F_612001823_TkzT0xmIgagoDCyQ0yuJYEGu8j6VNVYT.jpg",
    },
    {
      name: "Nike Air Force 1",
      price: 120,
      img: "https://t4.ftcdn.net/jpg/05/06/36/71/360_F_506367145_aTN8tLqtKXDYxzHQs5DH4HGsbVT9OgMn.jpg",
    },
    {
      name: "Adidas Ultraboost",
      price: 180,
      img: "https://media.istockphoto.com/id/1350560575/photo/pair-of-blue-running-sneakers-on-white-background-isolated.jpg?s=612x612&w=0&k=20&c=A3w_a9q3Gz-tWkQL6K00xu7UHdN5LLZefzPDp-wNkSU=",
    },
    {
      name: "Puma RS-X",
      price: 130,
      img: "https://t4.ftcdn.net/jpg/02/11/11/15/360_F_211111574_VLtzH6ORhebXvnJXjlkAkaUuAftnvmJH.jpg",
    },
    {
      name: "Converse Chuck Taylor",
      price: 80,
      img: "https://img.freepik.com/premium-photo/colorful-sport-shoes-green_151013-4554.jpg",
    },
  ];
  const [selectedData, setSelectedData] = useState([]);
  const [total,setTotal]=useState(0);
  const addItemToCart = (item) => {
  
    const existingItem = selectedData.find(
      (cardItem) => cardItem.name === item.name
    );
    if (existingItem) {
      const updatedCart = selectedData.map((cartItem) =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setSelectedData(updatedCart);
    } else {
      const newItem = { ...item, quantity: 1 };
      setSelectedData([...selectedData, newItem]);

    }
    setTotal(total + item.price);
  };
  const increaseItem = (cartItem) => {
    // alert('clicked')
    const updatedCart = selectedData.map((item) =>
      item.name === cartItem.name ? { ...item, quantity: item.quantity + 1 }: item
    );
    setSelectedData(updatedCart);
    setTotal(total + cartItem.price);
  };
  const decreaseItem = (cartItem) => {
    // alert('clicked')
    const updatedCart = selectedData.map((item) =>
      item.name === cartItem.name ? { ...item, quantity: item.quantity - 1 }: item
    );
    setSelectedData(updatedCart);
    setTotal(total - cartItem.price);
  };
  useEffect(() => {
    let fitterData= selectedData.filter((item)=> item.quantity!==0)
    setSelectedData(fitterData)
    console.log("filterdata", fitterData)
    
  },[total])

  return (
    <>
      <div className="main">
        <div className="left">
          {shoes.map((item, index) => {
            return (
              <div className="card" key={index}>
                <div className="imgdiv">
                  <img src={item.img} alt="img" />
                </div>
                <div className="content">
                  <h2>{item.name}</h2>
                  <p>{`$ ${item.price}`}</p>
                  <button
                    onClick={() => addItemToCart(item)}

                    //   disabled={addedItems.includes(item.name)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="right">
          <div className="AddToCart">
            <h2>Cart</h2>
            {selectedData.map((cartItem, index) => (
              <div className="Addtocartitem">
                <div className="imgAndname">
                  <img src={cartItem.img} alt="" />
                  <h3>{cartItem.name}</h3>
                </div>
                <div className="pricediv">
                  <button 
                 onClick={()=>decreaseItem(cartItem)}
                  >-</button>
                  <p>{cartItem.quantity}</p>
                  <button onClick={()=>increaseItem(cartItem)}>+</button>

                </div>
              </div>
            ))}
              <p> Total: {total} </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Main;
