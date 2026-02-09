# 🌱 AgroConnect - Farm-to-Table Supply Chain Platform

AgroConnect is a MERN stack web application designed to bridge the gap between Farmers, Restaurants, and Delivery Drivers. It streamlines the agricultural supply chain by allowing farmers to sell produce directly to restaurants, without middlemen, while drivers manage the logistics.

![AgroConnect Banner](https://via.placeholder.com/1200x500/16a34a/ffffff?text=AgroConnect+Platform)

## 🚀 Features

### 👨‍🌾 For Farmers
- **Product Management**: Add and manage fresh produce listings with quantities.
- **Order Management**: Accept or reject incoming orders from restaurants.
- **Inventory Tracking**: Automatic stock updates upon order acceptance.

### 🍽️ For Restaurants
- **Marketplace**: Browse available produce from local farmers.
- **Direct Ordering**: Place orders for specific quantities.
- **Live Status**: Track order status from "Pending" to "Delivered".

### 🚚 For Drivers
- **Job Board**: View "Accepted" orders ready for pickup.
- **Delivery Workflow**: "Pick" orders and mark them as "Delivered".
- **Route Management**: simple interface to manage active deliveries.

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router, React Icons, React Toastify.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ODM).
- **Authentication**: JWT (JSON Web Tokens) with role-based access control.

## 🔄 Project Workflow (How it Works)

The application follows a strict 3-step supply chain flow:

1.  **Farmer Listing**:
    *   Farmer logs in and adds a Product (e.g., "Organic Tomatoes", 50kg).
2.  **Restaurant Ordering**:
    *   Restaurant logs in, browses products, and places an Order (e.g., 20kg of Tomatoes).
    *   Order Status: `Pending`
3.  **Farmer Acceptance (Crucial Step)**:
    *   Farmer sees the request and clicks "Accept".
    *   Inventory is automatically deducted.
    *   Order Status: `Accepted`
4.  **Driver Pickup**:
    *   Driver logs in. They ONLY see orders with status `Accepted`.
    *   Driver clicks "Accept Job" (Pick).
    *   Order Status: `Picked`
5.  **Final Delivery**:
    *   Driver delivers the goods and clicks "Confirm Delivery".
    *   Order Status: `Delivered`

## 📦 Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/agroconnect.git
    cd agroconnect
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    # Create a .env file with:
    # MONGO_URL=your_mongodb_connection_string
    # JWT_SECRET=your_secret_key
    # PORT=3000
    npm run dev
    ```

3.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

4.  **Access the App**
    *   Open `http://localhost:5173` (or the port shown in your terminal).

## 🛡️ Security Features
- **Protected Routes**: Users cannot access dashboards without logging in.
- **Role-Based Access**: A Driver cannot access the Farmer dashboard, etc.
- **Auth**: Secure Login/Signup with token-based authentication.

## 🔮 Future Improvements
- Payment Gateway Integration (Stripe/Razorpay).
- Real-time notifications using Socket.io.
- Map integration for live driver tracking.
