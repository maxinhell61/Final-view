import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories = [
    {
      name: 'Fruits',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80',
      description: 'Fresh and organic fruits delivered to your door',
    },
    {
      name: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80',
      description: 'Locally sourced and farm-fresh vegetables',
    },
    {
      name: 'Dairy',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80',
      description: 'Quality dairy products and free-range eggs',
    },
  ];

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 opacity-90" />
        <div className="relative z-10 px-8 py-16 text-center text-white">
          <h1 className="text-5xl font-bold mb-6">Fresh Groceries Delivered Fast</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get your groceries delivered in minutes!
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transform hover:scale-105 transition-all duration-200"
          >
            Shop Now
          </Link>
        </div>
      </motion.section>

      {/* Categories Section */}
      <section ref={ref} className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-gray-200 mb-4">{category.description}</p>
                <Link
                  to={`/products?category=${category.name.toLowerCase()}`}  // Pass category via query parameter
                  className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-colors duration-200"
                >
                  Browse Category →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="bg-primary-50 rounded-2xl p-12 text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Same-day delivery available</p>
          </div>
          <div className="p-6">
            <div className="text-4xl mb-4">🥬</div>
            <h3 className="text-xl font-semibold mb-2">Fresh Products</h3>
            <p className="text-gray-600">Sourced directly from local farms</p>
          </div>
          <div className="p-6">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600">100% secure payment methods</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default Home;














// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';

// function Home() {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   const categories = [
//     {
//       name: 'Fruits',
//       image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80',
//       description: 'Fresh and organic fruits delivered to your door',
//     },
//     {
//       name: 'Vegetables',
//       image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80',
//       description: 'Locally sourced and farm-fresh vegetables',
//     },
//     {
//       name: 'Dairy',
//       image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80',
//       description: 'Quality dairy products and free-range eggs',
//     },
//   ];

//   return (
//     <div className="space-y-12 max-w-7xl mx-auto px-4 py-8">
//       {/* Hero Section */}
//       <motion.section
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="relative overflow-hidden rounded-2xl"
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 opacity-90" />
//         <div className="relative z-10 px-8 py-16 text-center text-white">
//           <h1 className="text-5xl font-bold mb-6">Fresh Groceries Delivered Fast</h1>
//           <p className="text-xl mb-8 max-w-2xl mx-auto">
//             Get your groceries delivered in minutes!
//           </p>
//           <Link
//             to="/products"
//             className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold 
//                      hover:bg-primary-50 transform hover:scale-105 transition-all duration-200"
//           >
//             Shop Now
//           </Link>
//         </div>
//       </motion.section>

//       {/* Categories Section */}
//       <section ref={ref} className="py-12">
//         <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {categories.map((category, index) => (
//             <motion.div
//               key={category.name}
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.5, delay: index * 0.2 }}
//               className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl 
//                          transition-all duration-300 transform hover:-translate-y-1"
//             >
//               <div className="aspect-w-16 aspect-h-9">
//                 <img
//                   src={category.image}
//                   alt={category.name}
//                   className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300"
//                 />
//               </div>
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
//               <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//                 <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
//                 <p className="text-sm text-gray-200 mb-4">{category.description}</p>
//                 <Link
//                   to="/products"
//                   className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg
//                            hover:bg-white/30 transition-colors duration-200"
//                 >
//                   Browse Category →
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Why Choose Us */}
//       <motion.section
//         initial={{ opacity: 0 }}
//         animate={inView ? { opacity: 1 } : {}}
//         transition={{ duration: 0.6 }}
//         className="bg-primary-50 rounded-2xl p-12 text-center"
//       >
//         <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="p-6">
//             <div className="text-4xl mb-4">🚚</div>
//             <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
//             <p className="text-gray-600">Same-day delivery available</p>
//           </div>
//           <div className="p-6">
//             <div className="text-4xl mb-4">🥬</div>
//             <h3 className="text-xl font-semibold mb-2">Fresh Products</h3>
//             <p className="text-gray-600">Sourced directly from local farms</p>
//           </div>
//           <div className="p-6">
//             <div className="text-4xl mb-4">💳</div>
//             <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
//             <p className="text-gray-600">100% secure payment methods</p>
//           </div>
//         </div>
//       </motion.section>
//     </div>
//   );
// }

// export default Home;


















// import { Link } from 'react-router-dom';

// function Home() {
//   return (
//     <div className="space-y-8">
//       <section className="bg-primary rounded-lg text-white p-8 text-center">
//         <h1 className="text-4xl font-bold mb-4">Fresh Groceries Delivered Fast</h1>
//         <p className="text-xl mb-6">Get your groceries delivered in minutes!</p>
//         <Link
//           to="/products"
//           className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
//         >
//           Shop Now
//         </Link>
//       </section>

//       <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {['Fruits', 'Vegetables', 'Dairy'].map((category) => (
//           <div
//             key={category}
//             className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
//           >
//             <h3 className="text-xl font-semibold mb-2">{category}</h3>
//             <Link
//               to="/products"
//               className="text-primary hover:underline"
//             >
//               Browse Category →
//             </Link>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// }

// export default Home;