import { useEffect, useState } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCartItems = async () => {
    try {
      const res = await fetch('http://localhost:5000/cart/view', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
      });

      if (!res.ok) throw new Error('Failed to fetch cart items');

      const data = await res.json();
      setCartItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Update quantity using product_id instead of cart item ID
  const handleQuantityChange = async (product_id, action) => {
    const cartItem = cartItems.find((item) => item.product_id === product_id);
    if (!cartItem) return;

    const newQuantity =
      action === 'increase'
        ? cartItem.quantity + 1
        : cartItem.quantity - 1;

    if (newQuantity < 1) return; // you may choose to auto-remove here

    try {
      const res = await fetch(`http://localhost:5000/update_cart_quantity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ product_id, quantity: newQuantity }),
      });

      if (!res.ok) throw new Error('Failed to update quantity');

      fetchCartItems();
    } catch (err) {
      alert(err.message);
    }
  };



  const handleRemove = async (cart_id) => {
    try {
      const res = await fetch(`http://localhost:5000/cart/remove/${cart_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!res.ok) throw new Error('Failed to remove item');
  
      fetchCartItems(); // Refresh cart
    } catch (err) {
      alert(err.message);
    }
  };




  // Remove using the unique cart item id
  // const handleRemove = async (cart_id) => {
  //   try {
  //     const res = await fetch(`http://localhost:5000/remove_from_cart/${cart_id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });

  //     if (!res.ok) throw new Error('Failed to remove item');

  //     fetchCartItems();
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Your cart is empty</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.cart_id} className="flex items-center space-x-4 py-4 border-b">
                <img
                  src={`http://localhost:5000/${item.image_url}`}
                  alt={item.product_name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.product_name}</h3>
                  <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() => handleQuantityChange(item.product_id, 'decrease')}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() => handleQuantityChange(item.product_id, 'increase')}
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemove(item.cart_id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-6">
            <div className="flex justify-between text-xl font-semibold">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button
              className="mt-4 w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90"
              onClick={() => alert('Proceeding to checkout!')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;














// import { useEffect, useState } from 'react';

// function Cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchCartItems = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/cart/view', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//       });

//       if (!res.ok) throw new Error('Failed to fetch cart items');

//       const data = await res.json();
//       setCartItems(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const handleQuantityChange = async (id, action) => {
//     const newQuantity =
//   action === 'increase'
//     ? cartItems.find((item) => item.product_id === id).quantity + 1
//     : cartItems.find((item) => item.product_id === id).quantity - 1;


//     if (newQuantity < 1) return;

//     try {
//       const res = await fetch(`http://localhost:5000/update_cart_quantity`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ product_id: id, quantity: newQuantity }),
//       });

//       if (!res.ok) throw new Error('Failed to update quantity');

//       fetchCartItems();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleRemove = async (id) => {
//     try {
//       const res = await fetch(`http://localhost:5000/remove_from_cart/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//       });

//       if (!res.ok) throw new Error('Failed to remove item');

//       fetchCartItems();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

//       {cartItems.length === 0 ? (
//         <div className="text-center py-8">
//           <p className="text-gray-600">Your cart is empty</p>
//         </div>
//       ) : (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="space-y-4">
//             {cartItems.map((item) => (
//               <div key={item.id} className="flex items-center space-x-4 py-4 border-b">
//                 <img
//                   src={`http://localhost:5000/${item.image_url}`}
//                   alt={item.name}
//                   className="w-24 h-24 object-cover rounded"
//                 />
//                 <div className="flex-1">
//                   <h3 className="text-lg font-semibold">{item.name}</h3>
//                   <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     className="px-2 py-1 border rounded"
//                     onClick={() => handleQuantityChange(item.id, 'decrease')}
//                   >
//                     -
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button
//                     className="px-2 py-1 border rounded"
//                     onClick={() => handleQuantityChange(item.id, 'increase')}
//                   >
//                     +
//                   </button>
//                 </div>
//                 <button
//                   className="text-red-500 hover:text-red-700"
//                   onClick={() => handleRemove(item.id)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>

//           <div className="mt-6 border-t pt-6">
//             <div className="flex justify-between text-xl font-semibold">
//               <span>Total:</span>
//               <span>₹{total.toFixed(2)}</span>
//             </div>
//             <button
//               className="mt-4 w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90"
//               onClick={() => alert('Proceeding to checkout!')}
//             >
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Cart;













