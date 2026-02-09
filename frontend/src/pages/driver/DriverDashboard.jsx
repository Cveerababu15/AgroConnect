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

  const [deliveries, setDeliveries] = useState([]);
  const [myDelivery, setMyDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = async () => {
    setLoading(true);
    try {
      // Get available jobs
      const res = await getAvailableDeliveries(token);

      // Get my current deliveries
      const myRes = await getDriverOrders(token);

      setDeliveries(res.orders || []);

      // Check if driver already has an active delivery (Picked but not Delivered)
      const active = myRes.orders?.find(o => o.status === 'Picked');
      if (active) {
        setMyDelivery(active);
        setDeliveries([]);
      } else {
        setMyDelivery(null);
      }
    } catch (error) {
      toast.error("Failed to load deliveries");
    } finally {
      setLoading(false);
    }
  };

  const handlePick = async (id) => {
    setActionLoading(true);
    try {
      const res = await pickDelivery(id, token);
      if (res.order) {
        toast.success("Delivery picked! Get moving.");
        loadDeliveries();
      } else {
        toast.error(res.message || "Failed to pick delivery");
      }
    } catch (error) {
      toast.error("Error picking delivery");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeliver = async () => {
    setActionLoading(true);
    try {
      const res = await deliverOrder(myDelivery._id, token);
      if (res.order) {
        toast.success("Great job! Order delivered successfully.");
        setMyDelivery(null);
        loadDeliveries();
      } else {
        toast.error(res.message || "Failed to mark as delivered");
      }
    } catch (error) {
      toast.error("Error updating delivery status");
    } finally {
      setActionLoading(false);
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
          <FaTruck className="text-green-600" />
          <span>Driver Dashboard</span>
        </h1>
        <p className="text-gray-600 mt-2">Find and manage your delivery tasks</p>
      </header>

      {/* ACTIVE DELIVERY */}
      {myDelivery ? (
        <section className="bg-white rounded-2xl shadow-lg border-2 border-green-500 overflow-hidden transform transition-all hover:scale-[1.01]">
          <div className="bg-green-500 px-6 py-4 flex justify-between items-center text-white">
            <h2 className="text-xl font-bold flex items-center space-x-2">
              <FaTruck className="animate-bounce" />
              <span>Active Delivery in Progress</span>
            </h2>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
              ON THE WAY
            </span>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-green-50 rounded-lg text-green-600">
                    <FaBox />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Product Info</p>
                    <p className="text-lg font-bold text-gray-800">{myDelivery.productId?.name}</p>
                    <p className="text-gray-600">{myDelivery.quantityKg} Kg to be delivered</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <FaUserAlt />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">From Farmer</p>
                    <p className="text-lg font-bold text-gray-800">{myDelivery.farmerId?.name}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Destination</p>
                    <p className="text-lg font-bold text-gray-800">{myDelivery.restaurantId?.name}</p>
                    <p className="text-gray-600">Restaurant Partner</p>
                  </div>
                </div>

                <button
                  onClick={handleDeliver}
                  disabled={actionLoading}
                  className="w-full mt-4 bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 shadow-lg shadow-green-100 transition-all flex items-center justify-center space-x-3 active:scale-95 disabled:opacity-70"
                >
                  {actionLoading ? (
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <FaCheckCircle className="text-xl" />
                      <span>Confirm Delivery</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* AVAILABLE DELIVERIES */
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
              <FaClipboardList className="text-green-600" />
              <span>Available Jobs</span>
            </h2>
          </div>

          <div className="p-6">
            {deliveries.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-4">
                  <FaTruck className="text-4xl text-gray-200" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No deliveries available</h3>
                <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                  Deliveries appear here after a <strong>Farmer accepts</strong> an order from a Restaurant.
                </p>
                <div className="mt-4 bg-yellow-50 text-yellow-800 text-sm p-3 rounded-lg border border-yellow-100 inline-block text-left">
                  <p className="font-bold mb-1">How it works:</p>
                  <ol className="list-decimal pl-4 space-y-1">
                    <li>Restaurant places an order.</li>
                    <li>Farmer accepts the order.</li>
                    <li><strong>Order appears here for you!</strong></li>
                  </ol>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {deliveries.map((d) => (
                  <div
                    key={d._id}
                    className="group border border-gray-100 rounded-xl p-6 hover:border-blue-200 hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-center gap-6"
                  >
                    <div className="flex-grow grid sm:grid-cols-3 gap-6 w-full">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-gray-50 rounded-xl text-gray-400 group-hover:text-blue-500 group-hover:bg-blue-50 transition-colors">
                          <FaBox className="text-xl" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-tight">Product</p>
                          <p className="font-bold text-gray-800">{d.productId?.name}</p>
                          <p className="text-sm text-gray-500 font-medium">{d.quantityKg} Kg</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-tight">Farmer</p>
                        <p className="font-semibold text-gray-700 mt-1">{d.farmerId?.name}</p>
                        <div className="flex items-center text-gray-400 text-xs mt-1">
                          <FaArrowRight className="mr-1 rotate-90 sm:rotate-0" />
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-tight">Restaurant</p>
                        <p className="font-semibold text-gray-700 mt-1">{d.restaurantId?.name}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handlePick(d._id)}
                      disabled={actionLoading}
                      className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all flex items-center justify-center space-x-2 active:scale-95"
                    >
                      {actionLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>Accept Job</span>
                          <FaArrowRight className="text-sm" />
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
