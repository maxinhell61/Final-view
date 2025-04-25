
import { Link } from "react-router-dom";

function User() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">User page </h2>

<div className="space-y-4">
        <Link
          to="/user-details"
          className="block w-full bg-primary text-white py-2 px-4 rounded-lg text-center hover:bg-primary/90 transition-colors"
        >
          User Details
        </Link>
        <Link
          to="/orders"
          className="block w-full bg-primary text-white py-2 px-4 rounded-lg text-center hover:bg-primary/90 transition-colors"
        >
          Orders
        </Link>
        <Link
          to="/address"
          className="block w-full bg-primary text-white py-2 px-4 rounded-lg text-center hover:bg-primary/90 transition-colors"
        >
          Address
        </Link>
        <Link
          to="/customer-support"
          className="block w-full bg-primary text-white py-2 px-4 rounded-lg text-center hover:bg-primary/90 transition-colors"
        >
          Customer Support
        </Link>
      </div>
    </div>
  );
}

export default User;

          
