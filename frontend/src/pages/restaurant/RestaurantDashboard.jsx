import { useEffect, useState } from "react";
import {
  getAvailableProducts,
  placeOrder,
  getMyOrders
} from "../../services/api";
import { toast } from "react-toastify";
import { FaUtensils, FaShoppingCart, FaHistory, FaUser, FaLeaf, FaRupeeSign, FaWeightHanging, FaArrowRight } from "react-icons/fa";

export default function RestaurantDashboard() {
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const p = await getAvailableProducts(token);
      const o = await getMyOrders(token);
      setProducts(p.products || []);
      setOrders(o.orders || []);
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async (productId) => {
    const qty = quantity[productId];
    if (!qty || qty <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    const product = products.find(p => p._id === productId);
    if (qty > product.quantityAvailable) {
      toast.error(`Only ${product.quantityAvailable}kg available`);
      return;
    }

    setOrderLoading(productId);
    try {
      const res = await placeOrder(
        {
          productId,
          quantityKg: qty
        },
        token
      );

      if (res.order) {
        toast.success(`Successfully ordered ${qty}kg of ${product.name}`);
        setQuantity({ ...quantity, [productId]: "" });
        loadData();
      } else {
        toast.error(res.message || "Failed to place order");
      }
    } catch (error) {
      toast.error("Error placing order");
    } finally {
      setOrderLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    const s = status.toLowerCase();
    const styles = {
      pending: "bg-amber-100 text-amber-700 border-amber-200",
      accepted: "bg-blue-100 text-blue-700 border-blue-200",
      rejected: "bg-red-100 text-red-700 border-red-200",
      picked: "bg-indigo-100 text-indigo-700 border-indigo-200",
      delivered: "bg-green-100 text-green-700 border-green-200",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[s] || "bg-gray-100 text-gray-700"}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 font-medium">Fetching fresh produce...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
          <FaUtensils className="text-green-600" />
          <span>Restaurant Dashboard</span>
        </h1>
        <p className="text-gray-600 mt-2">Source fresh ingredients directly from farmers</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* AVAILABLE PRODUCTS */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
              <FaLeaf className="text-green-600" />
              <span>Available Marketplace</span>
            </h2>
            <span className="text-sm text-gray-500 font-medium">{products.length} Products</span>
          </div>
          <div className="p-6">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <FaLeaf className="text-5xl text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500">No products available at the moment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((p) => (
                  <div
                    key={p._id}
                    className="group border border-gray-100 rounded-xl p-4 hover:border-green-200 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{p.name}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                          <span className="text-green-600 font-bold flex items-center">
                            <FaRupeeSign className="text-xs mr-1" />
                            {p.pricePerKg} / Kg
                          </span>
                          <span className="text-gray-500 text-sm flex items-center">
                            <FaWeightHanging className="text-xs mr-1" />
                            {p.quantityAvailable} Kg in stock
                          </span>
                          <span className="text-gray-400 text-sm flex items-center">
                            <FaUser className="text-xs mr-1" />
                            {p.farmerId?.name}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <input
                            type="number"
                            placeholder="Qty"
                            min="1"
                            max={p.quantityAvailable}
                            className="w-24 pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all"
                            value={quantity[p._id] || ""}
                            onChange={(e) =>
                              setQuantity({ ...quantity, [p._id]: e.target.value })
                            }
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">Kg</span>
                        </div>
                        <button
                          onClick={() => handleOrder(p._id)}
                          disabled={orderLoading === p._id}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-70"
                        >
                          {orderLoading === p._id ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <>
                              <FaShoppingCart className="text-sm" />
                              <span>Order</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* MY ORDERS */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
              <FaHistory className="text-green-600" />
              <span>Purchase History</span>
            </h2>
          </div>
          <div className="p-6">
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <FaHistory className="text-5xl text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500">You haven't placed any orders yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-400 text-sm uppercase tracking-wider">
                      <th className="pb-4 font-medium">Product</th>
                      <th className="pb-4 font-medium text-center">Quantity</th>
                      <th className="pb-4 font-medium text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {orders.map((o) => (
                      <tr key={o._id} className="group hover:bg-gray-50 transition-colors">
                        <td className="py-4">
                          <div className="font-semibold text-gray-700">{o.productId?.name}</div>
                          <div className="text-xs text-gray-400">ID: {o._id.slice(-6)}</div>
                        </td>
                        <td className="py-4 text-center font-medium text-gray-600">
                          {o.quantityKg} Kg
                        </td>
                        <td className="py-4 text-right">
                          {getStatusBadge(o.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
