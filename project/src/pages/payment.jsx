import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically process the payment
    alert('Payment processed successfully!');
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              required
              maxLength="16"
              className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
              placeholder="Enter card number"
            />
          </div>

          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
              Name on Card
            </label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
              placeholder="Enter name on card"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
                placeholder="MM/YY"
                maxLength="5"
                className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="password"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                required
                maxLength="4"
                className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                placeholder="Enter CVV"
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">$29.99</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">$5.00</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">$34.99</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;