import { useEffect, useState } from "react";
import {
  getMyProducts,
  addProduct,
  getFarmerOrders,
  acceptOrder,
  rejectOrder
} from "../../services/api";
import { toast } from "react-toastify";
import { FaPlus, FaCheck, FaTimes, FaBoxOpen, FaClipboardList, FaLeaf, FaRupeeSign, FaWeightHanging } from "react-icons/fa";

export default function FarmerDashboard() {
  const token = sessionStorage.getItem("token");

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    pricePerKg: "",
    quantityAvailable: ""
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const p = await getMyProducts(token);
      const o = await getFarmerOrders(token);
      setProducts(p.products || []);
      setOrders(o.orders || []);
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!form.name || !form.pricePerKg || !form.quantityAvailable) {
      toast.error("Please fill all fields");
      return;
    }

    setActionLoading(true);
    try {
      const res = await addProduct(form, token);
      if (res.product) {
        toast.success("Product added successfully");
        setForm({ name: "", pricePerKg: "", quantityAvailable: "" });
        loadData();
      } else {
        toast.error(res.message || "Failed to add product");
      }
    } catch (error) {
      toast.error("Error adding product");
    } finally {
      setActionLoading(false);
    }
  };

  const handleOrderAction = async (id, action) => {
    try {
      const res = action === 'accept' ? await acceptOrder(id, token) : await rejectOrder(id, token);
      if (res.order || res.message) {
        toast.success(`Order ${action === 'accept' ? 'accepted' : 'rejected'} successfully`);
        loadData();
      }
    } catch (error) {
      toast.error(`Failed to ${action} order`);
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
        <p className="text-gray-600 font-medium">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
          <FaLeaf className="text-green-600" />
          <span>Farmer Dashboard</span>
        </h1>
        <p className="text-gray-600 mt-2">Manage your produce and monitor incoming orders</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ADD PRODUCT */}
        <section className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
            <div className="bg-green-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
                <FaPlus className="text-sm" />
                <span>Add New Product</span>
              </h2>
            </div>
            <form onSubmit={handleAddProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  placeholder="e.g. Organic Tomatoes"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price / Kg</label>
                  <div className="relative">
                    <FaRupeeSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all"
                      value={form.pricePerKg}
                      onChange={(e) => setForm({ ...form, pricePerKg: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (Kg)</label>
                  <div className="relative">
                    <FaWeightHanging className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all"
                      value={form.quantityAvailable}
                      onChange={(e) => setForm({ ...form, quantityAvailable: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={actionLoading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md flex items-center justify-center space-x-2 disabled:opacity-70"
              >
                {actionLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <><FaPlus /> <span>Add Product</span></>}
              </button>
            </form>
          </div>
        </section>

        <div className="lg:col-span-2 space-y-8">
          {/* PRODUCTS LIST */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
                <FaBoxOpen className="text-green-600" />
                <span>My Produce</span>
              </h2>
              <span className="text-sm text-gray-500 font-medium">{products.length} Items</span>
            </div>
            <div className="p-6">
              {products.length === 0 ? (
                <div className="text-center py-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                    <FaBoxOpen className="text-3xl text-gray-300" />
                  </div>
                  <p className="text-gray-500">No products added yet. Start adding your produce!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-gray-400 text-sm uppercase tracking-wider">
                        <th className="pb-4 font-medium">Product</th>
                        <th className="pb-4 font-medium text-right">Price / Kg</th>
                        <th className="pb-4 font-medium text-right">Available</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {products.map((p) => (
                        <tr key={p._id} className="group hover:bg-gray-50 transition-colors">
                          <td className="py-4 font-semibold text-gray-700">{p.name}</td>
                          <td className="py-4 text-right text-green-600 font-bold">₹{p.pricePerKg}</td>
                          <td className="py-4 text-right text-gray-600 font-medium">{p.quantityAvailable} Kg</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>

          {/* ORDERS */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
                <FaClipboardList className="text-green-600" />
                <span>Recent Orders</span>
              </h2>
            </div>
            <div className="p-6">
              {orders.length === 0 ? (
                <div className="text-center py-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                    <FaClipboardList className="text-3xl text-gray-300" />
                  </div>
                  <p className="text-gray-500">No orders received yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((o) => (
                    <div
                      key={o._id}
                      className="border border-gray-100 rounded-xl p-4 hover:border-green-200 transition-all bg-gray-50/50"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg">{o.productId?.name}</h3>
                          <p className="text-sm text-gray-500 flex items-center space-x-1">
                            <FaWeightHanging className="text-xs" />
                            <span>{o.quantityKg} Kg Ordered</span>
                          </p>
                        </div>
                        {getStatusBadge(o.status)}
                      </div>

                      {o.status === "Pending" && (
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleOrderAction(o._id, 'accept')}
                            className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                          >
                            <FaCheck />
                            <span>Accept Order</span>
                          </button>
                          <button
                            onClick={() => handleOrderAction(o._id, 'reject')}
                            className="flex-1 flex items-center justify-center space-x-2 bg-white text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors"
                          >
                            <FaTimes />
                            <span>Reject</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
