import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import OrderService from "../../service/ItemService/orders";


// export const deleteProductAsync = createAsyncThunk(
//     "products/delete",
//     async (itemId: string, { rejectWithValue }) => {
//         try {
//             const response = await SuggestItemsService.deleteSuggestItem(itemId);
//             return itemId;
//         } catch (error: any) {
//             console.log(error.response.data);
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

export const getOrderByIdAsync = createAsyncThunk(
    "orders/getById",
    async (orderId: string, { rejectWithValue }) => {
        try {
            const response = await OrderService.getOrderById(orderId);
            return response.data;
        } catch (error: any) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

// export const updateProductAsync = createAsyncThunk(
//     "products/update",
//     async ({ itemId, productData }: Interfaces.UpdateProductPayload, { rejectWithValue }) => {
//         try {
//             const response = await SuggestItemsService.updateSuggestItem(
//                 itemId,
//                 productData
//             );
//             return response.data;
//         } catch (error: any) {
//             console.log(error.response.data);
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

export const OrdersDetailSlice = createSlice({
    name: "orders",
    initialState: {
        items: [] as DataInterfaces.Orders[],
        currentOrders: null as DataInterfaces.Orders | null,
        search: "",
        loading: false,
        error: null as unknown | null,
    },
    reducers: {
        setOrders: (state, action) => {
            state.items = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
    },
    extraReducers: (builder) => {
    //     builder
    //         .addCase(addProductAsync.pending, (state) => {
    //             state.loading = true;
    //         })
    //         .addCase(addProductAsync.fulfilled, (state, action) => {
    //             state.items.push(action.payload);
    //             state.loading = false;
    //         })
    //         .addCase(addProductAsync.rejected, (state, action) => {
    //             state.error = action.payload;
    //             state.loading = false;
    //         });
        // builder
        //     .addCase(deleteProductAsync.pending, (state) => {
        //         state.loading = true;
        //     })
        //     .addCase(deleteProductAsync.fulfilled, (state, action) => {
        //         state.items = state.items.filter((item) => item.id !== action.payload);
        //         state.loading = false;
        //     })
        //     .addCase(deleteProductAsync.rejected, (state, action) => {
        //         state.error = action.payload;
        //         state.loading = false;
        //     });
        builder
            .addCase(getOrderByIdAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrderByIdAsync.fulfilled, (state, action) => {
                state.currentOrders = action.payload;
                state.loading = false;
            })
            .addCase(getOrderByIdAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
        // builder
        //     .addCase(updateProductAsync.pending, (state) => {
        //         state.loading = true;
        //     })
        //     .addCase(updateProductAsync.fulfilled, (state, action) => {
        //         const index = state.items.findIndex(
        //             (item) => item.id === action.payload.id
        //         );
        //         if (index !== -1) {
        //             state.items[index] = action.payload;
        //         }
        //         state.loading = false;
        //     })
        //     .addCase(updateProductAsync.rejected, (state, action) => {
        //         state.error = action.payload;
        //         state.loading = false;
        //     });
    },
});

export const { setOrders, setSearch } = OrdersDetailSlice.actions;

export default OrdersDetailSlice.reducer;
