import React, { useState } from "react";
import UnderConstructionBanner from "../components/UnderConstructionBanner"; // Import the banner

function Subscriptions() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
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
    {
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
    {
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
  ];

  return (
    <>
      {/* Subtle Under Construction Banner */}
      <UnderConstructionBanner />

      <div className="min-h-screen bg-[#0f172a] p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-6 text-center text-[#00f7ff] tracking-wider">
            Choose Your Subscription
          </h1>

          {/* Billing Cycle Toggle */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-l-lg font-semibold ${
                billingCycle === "monthly"
                  ? "bg-[#00f7ff] text-black shadow-lg"
                  : "bg-[#1e293b] text-gray-300 hover:bg-[#2e3a4b]"
              } transition`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2 rounded-r-lg font-semibold ${
                billingCycle === "annual"
                  ? "bg-[#00f7ff] text-black shadow-lg"
                  : "bg-[#1e293b] text-gray-300 hover:bg-[#2e3a4b]"
              } transition`}
            >
              Annually (20% off)
            </button>
          </div>

          {/* Subscription Plans Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="bg-[#1e293b] rounded-lg shadow-xl p-6 flex flex-col hover:scale-105 transition-transform"
              >
                <h2 className="text-2xl font-bold mb-4 text-center text-[#00f7ff] tracking-wide">
                  {plan.name}
                </h2>
                <div className="text-center mb-6">
                  {billingCycle === "monthly" ? (
                    <span className="text-5xl font-extrabold text-white">
                      ${plan.monthlyPrice}
                    </span>
                  ) : (
                    <span className="text-5xl font-extrabold text-white">
                      ${plan.annualPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-lg text-gray-400">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
                <ul className="mb-6 space-y-4 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-gray-300 font-medium"
                    >
                      <svg
                        className="w-5 h-5 text-[#00f7ff] mr-2 flex-shrink-0"
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
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    if (plan.name === "Free") {
                      window.location.href = "/signup";
                    } else {
                      // Pass selected plan as a query parameter to Checkout page
                      window.location.href = `/checkout?plan=${encodeURIComponent(
                        plan.name
                      )}`;
                    }
                  }}
                  className="bg-[#00f7ff] hover:bg-[#0056ff] text-black font-semibold py-3 rounded-lg transition"
                >
                  {plan.name === "Free" ? "Get Started" : "Upgrade to " + plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Subscriptions;
