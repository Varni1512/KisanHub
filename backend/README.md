# KisanHub Backend

Node.js, Express.js, and MongoDB backend for KisanHub.

## Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment**
   - Copy `.env.example` to `.env`
   - Set `MONGODB_URI`
   - For image uploads (Shopkeeper products): Add Cloudinary credentials to `.env`:
     ```
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     ```

3. **Run the server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

## API Endpoints

### Auth
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login

### Users
- `GET /api/users` - All users (Admin)

### Schemes
- `GET /api/schemes` - All schemes
- `POST /api/schemes` - Add scheme (Admin)
- `PUT /api/schemes/:id` - Update scheme
- `DELETE /api/schemes/:id` - Delete scheme

### Shopkeeper / Medicine
- `POST /api/upload/image` - Upload image (Cloudinary)
- `GET /api/products` - All products (Farmer Agro Medicine)
- `GET /api/products/shop/:shopkeeperId` - Shopkeeper's products
- `POST /api/products` - Add product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/orders/shop/:shopkeeperId` - Shopkeeper's orders
- `POST /api/orders` - Place order (Farmer)
- `PUT /api/orders/:id/status` - Update order status
- `GET /api/shop-profile/:userId` - Get shop profile
- `PUT /api/shop-profile/:userId` - Update shop profile
- `GET /api/shop-stats/:shopkeeperId` - Dashboard stats
