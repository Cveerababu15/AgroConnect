import { useEffect, useState } from "react";
import {
  getAvailableDeliveries,
  getDriverOrders,
  pickDelivery,
  deliverOrder
} from "../../services/api";
import { toast } from "react-toastify";
import { FaTruck, FaBox, FaMapMarkerAlt, FaCheckCircle, FaClipboardList, FaArrowRight, FaUserAlt } from "react-icons/fa";

export default function DriverDashboard() {
  const token = localStorage.getItem("token");

  const [availableDeliveries, setAvailableDeliveries] = useState([]);
  const [myDeliveries, setMyDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = async (isBackground = false) => {
    if (!isBackground) setLoading(true);
    try {
      // Get available jobs
      const res = await getAvailableDeliveries(token);

      // Get my current deliveries
      const myRes = await getDriverOrders(token);

      setAvailableDeliveries(res.orders || []);

      // Filter for active deliveries (Picked but not Delivered)
      const active = myRes.orders?.filter(o => o.status === 'Picked') || [];
      setMyDeliveries(active);

    } catch (error) {
      toast.error("Failed to load deliveries");
    } finally {
      if (!isBackground) setLoading(false);
    }
  };

  const handlePick = async (id) => {
    setActionLoading(id);
    try {
      const res = await pickDelivery(id, token);
      if (res.order) {
        toast.success("Delivery picked! Get moving.");
        loadDeliveries(true);
      } else {
        toast.error(res.message || "Failed to pick delivery");
      }
    } catch (error) {
      toast.error("Error picking delivery");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeliver = async (id) => {
    setActionLoading(id);
    try {
      const res = await deliverOrder(id, token);
      if (res.order) {
        toast.success("Great job! Order delivered successfully.");
        loadDeliveries(true);
      } else {
        toast.error(res.message || "Failed to mark as delivered");
      }
    } catch (error) {
      toast.error("Error updating delivery status");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 font-medium">Checking for available routes...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
          <FaTruck className="text-green-600" />
          <span>Driver Dashboard</span>
        </h1>
        <p className="text-gray-600 mt-2">Find and manage your delivery tasks</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* ACTIVE DELIVERIES */}
        <section className="bg-white rounded-2xl shadow-lg border-2 border-green-500 overflow-hidden h-fit">
          <div className="bg-green-500 px-6 py-4 flex justify-between items-center text-white">
            <h2 className="text-xl font-bold flex items-center space-x-2">
              <FaTruck className="animate-bounce" />
              <span>Active Deliveries ({myDeliveries.length})</span>
            </h2>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
              IN PROGRESS
            </span>
          </div>

          <div className="p-6">
            {myDeliveries.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No active deliveries. Pick a job from the list!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {myDeliveries.map((delivery) => (
                  <div key={delivery._id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-green-50 rounded-lg text-green-600">
                          <FaBox />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Product Info</p>
                          <p className="text-lg font-bold text-gray-800">{delivery.productId?.name}</p>
                          <p className="text-gray-600">{delivery.quantityKg} Kg to be delivered</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                          <FaUserAlt />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">From Farmer</p>
                          <p className="text-lg font-bold text-gray-800">{delivery.farmerId?.name}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                          <FaMapMarkerAlt />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Destination</p>
                          <p className="text-lg font-bold text-gray-800">{delivery.restaurantId?.name}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeliver(delivery._id)}
                        disabled={actionLoading === delivery._id}
                        className="w-full mt-2 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 shadow-md shadow-green-100 transition-all flex items-center justify-center space-x-2 active:scale-95 disabled:opacity-70"
                      >
                        {actionLoading === delivery._id ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <FaCheckCircle />
                            <span>Confirm Delivery</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* AVAILABLE JOBS */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-fit">
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
              <FaClipboardList className="text-green-600" />
              <span>Available Jobs ({availableDeliveries.length})</span>
            </h2>
          </div>

          <div className="p-6">
            {availableDeliveries.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-4">
                  <FaTruck className="text-4xl text-gray-200" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No deliveries available</h3>
                <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                  Deliveries appear here after a <strong>Farmer accepts</strong> an order.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {availableDeliveries.map((d) => (
                  <div
                    key={d._id}
                    className="group border border-gray-100 rounded-xl p-6 hover:border-blue-200 hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-center gap-6"
                  >
                    <div className="flex-grow grid sm:grid-cols-2 gap-4 w-full">
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-tight">Product</p>
                        <p className="font-bold text-gray-800">{d.productId?.name}</p>
                        <p className="text-sm text-gray-500 font-medium">{d.quantityKg} Kg</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-tight">Route</p>
                        <div className="text-sm text-gray-700 flex items-center flex-wrap gap-1">
                          <span>{d.farmerId?.name}</span>
                          <FaArrowRight className="text-gray-400 text-xs" />
                          <span>{d.restaurantId?.name}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handlePick(d._id)}
                      disabled={actionLoading === d._id}
                      className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all flex items-center justify-center space-x-2 active:scale-95 disabled:opacity-70 whitespace-nowrap"
                    >
                      {actionLoading === d._id ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>Accept</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
