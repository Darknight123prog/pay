import React, { useEffect, useState, useRef } from "react";
import dropin from "braintree-web-drop-in";
import axios from "axios";

function FormPage() {
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);
  const [amount, setAmount] = useState("");
  const[userName,setUserName]=useState('');
  const[ProductsName,setProductsName]=useState('');
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const dropinContainer = useRef(null);

  // Get client token
  useEffect(() => {
    axios.get(`${backendUrl}/api/payment/token`).then((res) => {
      setClientToken(res.data.clientToken);
    });
  }, []);

  // Initialize Drop-in manually
  useEffect(() => {
    if (clientToken && dropinContainer.current) {
      dropin.create(
        {
          authorization: clientToken,
          container: dropinContainer.current,
        },
        (err, dropinInstance) => {
          if (err) {
            console.error(err);
            return;
          }
          setInstance(dropinInstance);
          console.log("Drop-in instance ready:", dropinInstance);
        }
      );
    }
  }, [clientToken]);

  const handlePayment = async () => {
    if (!instance) return alert("Payment UI not ready");

    if (!amount || Number(amount) <= 0)
      return alert("Enter a valid amount");

    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();

      const { data } = await axios.post(`${backendUrl}/api/payment/pay`, {
        nonce,
        amount,
        User:userName,
        ProductsName
      });

      alert("Payment Successful 🎉\nTransaction ID: " + data.transactionId);
      instance.clearSelectedPaymentMethod(); // Reset UI
    } catch (err) {
      alert(err.response?.data?.error || "Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-center mb-4">
          Secure Payment
        </h2>

        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-md"
        />
        <input
          type="Name"
          placeholder="user name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-md"
        />
        <input
          type="product"
          placeholder="product name"
          value={ProductsName}
          onChange={(e) => setProductsName(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-md"
        />

        <div ref={dropinContainer} className="mb-4"></div>

        <button
          disabled={!instance || loading}
          onClick={handlePayment}
          className="w-full bg-black text-white py-3 rounded mt-4 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}

export default FormPage;
