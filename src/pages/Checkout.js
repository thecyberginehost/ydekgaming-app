import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import UnderConstructionBanner from "../components/UnderConstructionBanner"; // Import banner

const plans = {
  Free: {
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
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Under Construction Banner */}
      <UnderConstructionBanner />

      <div className="flex items-center justify-center p-8">
        <div className="max-w-lg w-full bg-[#1e293b] rounded-lg shadow-lg p-8">
          {/* Back to Home Link */}
          <div className="text-center mb-6">
            <Link to="/" className="text-[#00f7ff] underline font-medium">
              Return to Home
            </Link>
          </div>

          <h1 className="text-3xl font-extrabold text-center text-[#00f7ff] mb-6">
            Checkout
          </h1>

          {/* Display Selected Plan Details */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-center mb-4">
              You selected: <span className="text-[#00f7ff]">{selectedPlan.name} Tier</span>
            </h2>
            <div className="text-center text-2xl font-bold">
              <span>
                {billingCycle === "monthly"
                  ? `$${selectedPlan.monthlyPrice}`
                  : `$${selectedPlan.annualPrice.toFixed(2)}`}
              </span>
              <span className="text-lg text-gray-400">/{billingCycle === "monthly" ? "month" : "year"}</span>
            </div>
            <ul className="mt-4 space-y-2 text-gray-300">
              {selectedPlan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <svg
                    className="w-5 h-5 text-[#00f7ff] mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* User Information Form */}
          <div className="space-y-4">
            {["username", "email", "password", "confirmPassword"].map((field, idx) => (
              <div key={idx}>
                <label
                  className="block text-gray-300 mb-1 capitalize"
                  htmlFor={field}
                >
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  id={field}
                  name={field}
                  type={field.includes("password") ? "password" : "text"}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#0f172a] text-gray-300 border border-[#00f7ff] rounded focus:outline-none focus:ring-2 focus:ring-[#00f7ff]"
                  placeholder={`Enter your ${field}`}
                />
                {formErrors[field] && <p className="text-red-500 text-sm">{formErrors[field]}</p>}
              </div>
            ))}
          </div>

          {/* Payment Options */}
          <div className="mt-8 space-y-4">
            {["Stripe", "PayPal", "Crypto"].map((method) => (
              <button
                key={method}
                onClick={() => handlePaymentSelection(method)}
                className={`w-full py-3 font-semibold rounded-lg transition ${
                  billingInfoValid
                    ? `bg-${method === "Stripe" ? "[#00f7ff]" : method === "PayPal" ? "yellow-500" : "purple-600"} hover:bg-opacity-80`
                    : "bg-gray-600 cursor-not-allowed"
                }`}
              >
                {method === "Stripe" ? "💳" : method === "PayPal" ? "🅿️" : "₿"} Pay with {method}
              </button>
            ))}
          </div>

          {selectedPayment && (
            <p className="text-center text-gray-400 mt-4">
              {selectedPayment} payment integration coming soon!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
