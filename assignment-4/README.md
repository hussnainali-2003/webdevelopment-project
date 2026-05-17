# Assignment 4: E-Commerce Administration & Management System

A fully functional Tesla Admin Panel for managing product inventory with CRUD operations, image uploads, and MongoDB integration.

## Features

✅ **Dashboard** - View all products in a clean, organized table format  
✅ **Create Products** - Add new products with form validation  
✅ **Edit Products** - Update existing product details  
✅ **Delete Products** - Remove products with confirmation dialog  
✅ **Image Upload** - Upload and store product images using Multer  
✅ **Categories** - Organize products by category  
✅ **Real-time Feedback** - Success/error messages for all operations  
✅ **Responsive Design** - Works on all screen sizes  

## Project Structure

```
assignment-4/
├── models/
│   └── Product.js              # MongoDB Product schema
├── routes/
│   └── admin.js                # Admin CRUD routes with Multer
├── views/
│   ├── admin/
│   │   ├── list.ejs           # Dashboard showing all products
│   │   └── form.ejs           # Add/Edit product form
│   └── 404.ejs, error.ejs     # Error pages
├── public/
│   ├── css/
│   │   └── style.css          # Styles (optional)
│   ├── uploads/               # Uploaded product images
│   └── images/                # Static images
├── app.js                     # Main Express app
├── seed.js                    # Database seeding with 30 products
├── package.json               # Dependencies
├── .env                       # Environment variables
└── README.md                  # This file
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start MongoDB

Make sure MongoDB is running on your local machine:

```bash
mongod
```

Or if using MongoDB Atlas, update the `MONGO_URI` in `.env`

### 3. Configure Environment Variables

The `.env` file is already configured with default values:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/tesla_shop_admin
```

### 4. Seed the Database

Populate the database with 30 sample products:

```bash
npm run seed
```

This will create products across all categories:
- **Apparel**: T-shirts, hoodies, caps, jackets, socks
- **Accessories**: Floor mats, organizers, chargers, protectors
- **Charging**: Wall connectors, adapters, cable organizers
- **Lifestyle**: Decanter, whistle, mug, desk organizer, clock, phone grip
- **Vehicles**: Scale models of Model Y, Model S, Cybertruck, Model 3

### 5. Start the Server

```bash
npm start
```

The admin panel will be available at: **http://localhost:3000/admin**

## Usage Guide

### Dashboard (`/admin`)

View all products in a table format with:
- Product image thumbnail
- Name, category, price
- Stock quantity and rating
- Edit and Delete buttons

### Add Product (`/admin/new`)

Create a new product:
1. Fill in all required fields (Name, Category, Price)
2. Upload an image (optional)
3. Click "Create Product"

**Supported image formats**: JPEG, PNG, WebP, GIF (max 5 MB)

### Edit Product (`/admin/:id/edit`)

Update an existing product:
1. Click the "Edit" button on any product
2. Modify the fields you want to change
3. Upload a new image if desired
4. Click "Update Product"

### Delete Product

Remove a product:
1. Click the "Delete" button
2. Confirm the deletion in the popup
3. Product is removed (old image is cleaned up automatically)

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/admin` | View all products (dashboard) |
| GET | `/admin/new` | Show add product form |
| POST | `/admin` | Create new product |
| GET | `/admin/:id/edit` | Show edit product form |
| PUT | `/admin/:id` | Update product |
| DELETE | `/admin/:id` | Delete product |

## Database Schema

### Product Model

```javascript
{
  _id: ObjectId,
  name: String (required),
  price: Number (required, min: 0),
  category: String (required, enum: ['Apparel', 'Accessories', 'Charging', 'Lifestyle', 'Vehicles']),
  rating: Number (default: 0, min: 0, max: 5),
  stock: Number (default: 0, min: 0),
  image: String (default: '/public/images/default.jpg'),
  description: String (default: ''),
  createdAt: Date,
  updatedAt: Date
}
```

## Multer Configuration

Images are handled by Multer with the following settings:

- **Storage**: Disk storage in `/public/uploads`
- **Filename**: Timestamp + sanitized product name + extension
- **File size limit**: 5 MB
- **Allowed types**: JPEG, PNG, WebP, GIF
- **Auto-cleanup**: Old images are deleted when updated or deleted

## Error Handling

- **Validation errors**: Form fields are validated server-side
- **Image errors**: Only image files are allowed with size limits enforced
- **404 errors**: Custom error page for not found resources
- **500 errors**: Error details displayed in error page

## Security Features

✅ Input validation on all forms  
✅ File type validation for uploads  
✅ File size limits to prevent abuse  
✅ Automatic sanitization of filenames  
✅ Confirmation dialogs for destructive operations  
✅ Error logging for debugging  

## Example Seed Data

The `seed.js` creates 30 products including:

- Tesla Logo T-Shirts: $35.00
- Cybertruck Hoodie: $75.00
- Tesla Cap: $25.00
- Plaid Performance Jacket: $199.00
- Wall Connector: $475.00
- Mobile Connector Bundle: $230.00
- Tesla Tequila Decanter: $250.00
- Model Y Scale Model: $85.00
- Cybertruck Scale Model: $95.00

## Troubleshooting

### MongoDB Connection Failed

```
✖ MongoDB connection failed: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**: Make sure MongoDB is running:
```bash
mongod
```

### Image Upload Not Working

Check that `/public/uploads` directory exists and has write permissions.

### Port Already in Use

If port 3000 is already in use, change it in `.env`:
```env
PORT=3001
```

## Next Steps

This admin panel can be extended with:

1. **Authentication** (Lab 3) - Add login/registration and role-based access control
2. **Product Filtering** - Add search and filter on the dashboard
3. **Bulk Operations** - Import/export products as CSV
4. **Analytics** - Show sales statistics and product performance
5. **Image Gallery** - Allow multiple images per product
6. **Categories Management** - CRUD for categories themselves

## Dependencies

- **Express.js**: Web framework
- **Mongoose**: MongoDB object modeling
- **Multer**: File upload handling
- **EJS**: Template engine
- **method-override**: HTTP method override for PUT/DELETE
- **dotenv**: Environment variable management

## License

MIT

## Author

Assignment 4: E-Commerce Administration & Management System
