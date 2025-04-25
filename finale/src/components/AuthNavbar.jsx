import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            CLARION
          </Link>
           
        </div>
      </div>
    </nav>
  );
}

export default Navbar;