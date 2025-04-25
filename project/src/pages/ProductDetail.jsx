import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();

  // Mock product data
  const product = {
    id: parseInt(id),
    name: 'Fresh Apples',
    price: 2.99,
    description: 'Fresh and crispy apples picked from local orchards.',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6',
    nutrition: {
      calories: '52 kcal',
      protein: '0.3g',
      carbs: '14g',
      fiber: '2.4g',
    },
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
          
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl text-primary">${product.price.toFixed(2)}</p>
            <p className="text-gray-600">{product.description}</p>
            
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Nutrition Information</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(product.nutrition).map(([key, value]) => (
                  <div key={key} className="text-sm">
                    <span className="font-medium capitalize">{key}:</span> {value}
                  </div>
                ))}
              </div>
            </div>
            
            <button
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90"
              onClick={() => alert('Added to cart!')}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;




















// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { addToCart } from './services/cartservices';

// function ProductDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     fetch(`http://localhost:5000/get_product/${id}`)
//       .then(res => {
//         if (!res.ok) throw new Error('Failed to fetch product');
//         return res.json();
//       })
//       .then(data => setProduct(data))
//       .catch(err => setError(err.message));
//   }, [id]);

//   const handleAddToCart = async () => {
//     try {
//       const res = await addToCart(product.id, 1);
//       setMessage(res.message);
//     } catch (err) {
//       setMessage(err.message || 'Failed to add to cart');
//     }
//   };

//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!product) return <p>Loading...</p>;

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <img
//             src={`http://localhost:5000/${product.image_url}`}
//             alt={product.name}
//             className="w-full h-96 object-cover rounded-lg"
//           />
          
//           <div className="space-y-4">
//             <h1 className="text-3xl font-bold">{product.name}</h1>
//             <p className="text-2xl text-primary">₹{product.price.toFixed(2)}</p>
//             <p className="text-gray-600">{product.description}</p>

//             <button
//               className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90"
//               onClick={handleAddToCart}
//             >
//               Add to Cart
//             </button>
//             {message && <p className="text-sm text-green-600">{message}</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetail;















