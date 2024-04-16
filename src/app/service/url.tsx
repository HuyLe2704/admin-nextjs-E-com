// Suggest Items as Products
export const SUGGEST_ITEMS_REST_API_URL = 'http://localhost:8883/api/suggest_items';
export const ADD_SUGGEST_ITEMS = 'http://localhost:8883/api/suggest_items';

// Users Register
export const USER_REGISTER_API_URL = 'http://localhost:8883/api/users_register';

// Vouchers
export const VOUCHERS_API_URL = 'http://localhost:8883/api/cart_vouchers';

// Categories
export const CATEGORIES_API_URL = 'http://localhost:8883/api/categories'

// Item corresponding
export const ITEMCORS_API_URL = 'http://localhost:8883/api/item_corresponding'

// List Order
export const ORDERS_API_URL = 'http://localhost:8883/api/orders'
export const ORDERS_DETAIL_API_URL = 'http://localhost:8883/api/order_details'

// Customer 
export const GET_CUSTOMER_BY_ID_API_URL = 'http://localhost:8883/api/customers'

// File upload cloudinary
export const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
export const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
