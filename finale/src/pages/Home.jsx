import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="space-y-8">
      <section className="bg-primary rounded-lg text-white p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Fresh Groceries Delivered Fast</h1>
        <p className="text-xl mb-6">Get your groceries delivered in minutes!</p>
        <Link
          to="/products"
          className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
        >
          Shop Now
        </Link>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Fruits', 'Vegetables', 'Dairy'].map((category) => (
          <div
            key={category}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{category}</h3>
            <Link
              to="/products"
              className="text-primary hover:underline"
            >
              Browse Category →
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home;