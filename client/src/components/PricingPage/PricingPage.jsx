import * as React from "react";

function PricingPage() {
  return (
    <div>
      <h1>c</h1>
      <h1>Subscription Page</h1>
      <stripe-pricing-table
        pricing-table-id="prctbl_1OEtcLSFWXgoDvuj6YsXd7sU"
        publishable-key="pk_test_51ODldNSFWXgoDvuj1E5iY6Ibz6D7fumJwZRMtEeNGZdroLHhBHcuXZG3Fsmf5xUtPjjyHucVxI79arZJgBTZyLe500Cdyu4yts"
      ></stripe-pricing-table>
    </div>
  );
}

export default PricingPage;
