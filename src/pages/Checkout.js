import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import UnderConstructionBanner from "../components/UnderConstructionBanner";  // Import banner

const plans = {
  "Free": {
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      "Basic profile creation",
      "Limited tournament access",
      "Join existing guilds/clans",
      "View basic achievements",
      "Limited networking tools",
    ],
  },
  "Pro Gamer": {
    name: "Pro Gamer",
    monthlyPrice: 9.99,
    annualPrice: 9.99 * 12 * 0.8,
    features: [
      "All Free Tier features",
      "Priority tournament hosting",
      "Advanced profile customization",
      "Premium networking tools",
      "Basic analytics",
      "NFT profile pictures",
    ],
  },
  "Elite Gamer": {
    name: "Elite Gamer",
    monthlyPrice: 39.99,
    annualPrice: 39.99 * 12 * 0.8,
    features: [
      "All Pro Gamer features",
      "Advanced analytics",
      "Exclusive tournaments",
      "Guild management tools",
      "Early access to new features",
    ],
  },
};

function Checkout() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedPlanName = queryParams.get("plan") || "Free";
  const selectedPlan = plans[selectedPlanName] || plans["Free"];

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [billingInfoValid, setBillingInfoValid] = useState(false);

  const validateForm = () => {
    const errors = {};
    const { username, email, password, confirmPassword } = formData;

    if (!username.trim()) errors.username = "Username is required.";
    if (!email.trim()) errors.email = "Email is required.";
    if (!password) errors.password = "Password is required.";
    if (password && password.length < 8) errors.password = "Password must be at least 8 characters long.";
    if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match.";

    setFormErrors(errors);
    setBillingInfoValid(Object.keys(errors).length === 0);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handlePaymentSelection = (method) => {
    if (!billingInfoValid) {
      alert("Please fill out all fields correctly before proceeding.");
      return;
    }
    setSelectedPayment(method);
    alert(`${method} payment integration coming soon!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <UnderConstructionBanner /> {/* Under Construction Banner */}
      <div className="max-w-md w-full bg-white rounded-lg shadow p-6 space-y-6">
        
        {/* Back to Home Link using React Router's Link */}
        <div className="text-center">
          <Link to="/" className="text-blue-600 underline">Return Home</Link>
        </div>

        <h1 className="text-3xl font-bold mb-4 text-center">Checkout</h1>
        
        {/* Display Selected Plan Details */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-center">
            You selected: {selectedPlan.name} Tier
          </h2>
          <div className="text-center">
            <span className="text-4xl font-extrabold">
              {billingCycle === "monthly"
                ? `$${selectedPlan.monthlyPrice}`
                : `$${selectedPlan.annualPrice.toFixed(2)}`}
            </span>
            <span className="text-lg text-gray-600">
              /{billingCycle === "monthly" ? "month" : "year"}
            </span>
          </div>
          <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
            {selectedPlan.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>

        {/* User Information Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Choose a unique username"
            />
            {formErrors.username && <p className="text-red-500 text-sm">{formErrors.username}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Your email"
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Create a strong password"
            />
            <p className="text-xs text-gray-600 mt-1">
              Password must be at least 8 characters long.
            </p>
            {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Re-enter your password"
            />
            {formErrors.confirmPassword && <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>}
          </div>
        </div>

        {/* Payment Options */}
        <div className="space-y-4">
          <button
            onClick={() => handlePaymentSelection("Stripe")}
            className={`w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition ${
              !billingInfoValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <span className="mr-2">💳</span> Pay with Stripe
          </button>
          <button
            onClick={() => handlePaymentSelection("PayPal")}
            className={`w-full flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded transition ${
              !billingInfoValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <span className="mr-2">🅿️</span> Pay with PayPal
          </button>
          <button
            onClick={() => handlePaymentSelection("Crypto")}
            className={`w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded transition ${
              !billingInfoValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <span className="mr-2">₿</span> Pay with Crypto
          </button>
        </div>

        {selectedPayment && (
          <p className="mt-6 text-sm text-center text-gray-500">
            {selectedPayment} payment integration coming soon!
          </p>
        )}
      </div>
    </div>
  );
}

export default Checkout;
