import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../dashboard/products/slice'
import userReducer from '../dashboard/users/slice'
import voucherReducer from '../dashboard/vouchers/slice'
import categoryReducer from '../dashboard/categories/slice'
import ItemCorReducer from '../dashboard/categories/detail/[id]/slice'
import ordersReducer from '../dashboard/orders/slice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    users: userReducer,
    vouchers: voucherReducer,
    categories: categoryReducer,
    itemCorresponding: ItemCorReducer,
    orders: ordersReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch