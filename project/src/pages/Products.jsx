import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { addToCart } from './services/cartservices';

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const CATEGORIES = ["all", "fruits", "vegetables", "dairy"];

  // Read query parameter for category (if any)
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || "all";

  useEffect(() => {
    // When the component loads, set the selected category from query param
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    fetch('http://localhost:5000/get_all_products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        // Automatically filter based on initialCategory
        if (initialCategory === "all") {
          setFilteredProducts(data);
        } else {
          setFilteredProducts(data.filter(product => product.category.toLowerCase() === initialCategory));
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [initialCategory]);

  // If user selects a different category from the dropdown, update filtering.
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    if (category === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category.toLowerCase() === category));
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const res = await addToCart(productId);
      alert(res.message);
    } catch (err) {
      alert(err.message || 'Failed to add to cart');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      {/* Header Section with Category Dropdown */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Products</h2>
        <div className="flex justify-end">
          <label className="mr-2 font-semibold">Filter by Category:</label>
          <select
            className="border rounded-md p-2"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={`http://localhost:5000/${product.image_url}`}
              alt={product.name}
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">₹{product.price.toFixed(2)}</p>
              <button
                className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90"
                onClick={() => handleAddToCart(product.id)}
              >
                Add to Cart
              </button>
              <Link
                to={`/products/${product.id}`}
                className="mt-2 block text-center text-primary hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;



















// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { addToCart } from './services/cartservices';

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const CATEGORIES = ["All", "Fruits", "Vegetables", "Dairy"];

//   useEffect(() => {
//     fetch('http://localhost:5000/get_all_products')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch products');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setProducts(data);
//         setFilteredProducts(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   const handleCategoryChange = (event) => {
//     const category = event.target.value;
//     setSelectedCategory(category);

//     if (category === "All") {
//       setFilteredProducts(products);
//     } else {
//       setFilteredProducts(products.filter(product => product.category === category));
//     }
//   };

//   const handleAddToCart = async (productId) => {
//     try {
//       const res = await addToCart(productId);
//       alert(res.message);
//     } catch (err) {
//       alert(err.message || 'Failed to add to cart');
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div>
//       {/* Header Section with Category Dropdown */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">All Products</h2>

//         <div className="flex justify-end">
//           <label className="mr-2 font-semibold">Filter by Category:</label>
//           <select
//             className="border rounded-md p-2"
//             value={selectedCategory}
//             onChange={handleCategoryChange}
//           >
//             {CATEGORIES.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {filteredProducts.map((product) => (
//           <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img
//               src={`http://localhost:5000/${product.image_url}`}
//               alt={product.name}
//               className="w-full h-80 object-cover"
//             />

//             <div className="p-4">
//               <h3 className="text-lg font-semibold">{product.name}</h3>
//               <p className="text-gray-600">₹{product.price.toFixed(2)}</p>
//               <button
//                 className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90"
//                 onClick={() => handleAddToCart(product.id)}
//               >
//                 Add to Cart
//               </button>
//               <Link
//                 to={`/products/${product.id}`}
//                 className="mt-2 block text-center text-primary hover:underline"
//               >
//                 View Details
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Products;

















// import { Link } from 'react-router-dom';
// import { addToCart } from '../services/cartservices';

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const CATEGORIES = ["All", "Fruits", "Vegetables", "Dairy"];

//   useEffect(() => {
//     fetch('http://localhost:5000/get_all_products')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch products');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setProducts(data);
//         setFilteredProducts(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   const handleCategoryChange = (event) => {
//     const category = event.target.value;
//     setSelectedCategory(category);

//     if (category === "All") {
//       setFilteredProducts(products);
//     } else {
//       setFilteredProducts(products.filter(product => product.category === category));
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div>
//       {/* Header Section with Category Dropdown */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">All Products</h2>

//         {/* Dropdown Aligned to Right */}
//         <div className="flex justify-end">
//           <label className="mr-2 font-semibold">Filter by Category:</label>
//           <select
//             className="border rounded-md p-2"
//             value={selectedCategory}
//             onChange={handleCategoryChange}
//           >
//             {CATEGORIES.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {filteredProducts.map((product) => (
//           <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img
//               src={`http://localhost:5000/${product.image_url}`}
//               alt={product.name}
//               className="w-full h-80 object-cover"
//             />

//             <div className="p-4">
//               <h3 className="text-lg font-semibold">{product.name}</h3>
//               <p className="text-gray-600">₹{product.price.toFixed(2)}</p>
//               <button
//                 className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90"
//                 onClick={() => alert('Added to cart!')}
//               >
//                 Add to Cart
//               </button>
//               <Link
//                 to={`/products/${product.id}`}
//                 className="mt-2 block text-center text-primary hover:underline"
//               >
//                 View Details
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Products;














