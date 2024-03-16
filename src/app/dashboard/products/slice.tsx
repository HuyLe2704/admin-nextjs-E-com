import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SuggestItemsService from "../../service/ItemService/suggestItem";

export const addProductAsync = createAsyncThunk(
    "products/addNew",
    async (productData: DataInterfaces.SuggestItems[], { rejectWithValue }) => {
        try {
            const response = await SuggestItemsService.addListSuggestItems(
                productData
            );
            return response.data;
        } catch (error: any) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteProductAsync = createAsyncThunk(
    "products/delete",
    async (itemId: string, { rejectWithValue }) => {
        try {
            const response = await SuggestItemsService.deleteSuggestItem(itemId);
            return itemId;
        } catch (error: any) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const getProductByIdAsync = createAsyncThunk(
    "products/getById",
    async (itemId: string, { rejectWithValue }) => {
        try {
            const response = await SuggestItemsService.getSuggestItemById(itemId);
            return response.data;
        } catch (error: any) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateProductAsync = createAsyncThunk(
    "products/update",
    async ({ itemId, productData }: Interfaces.UpdateProductPayload, { rejectWithValue }) => {
        try {
            const response = await SuggestItemsService.updateSuggestItem(
                itemId,
                productData
            );
            return response.data;
        } catch (error: any) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [] as DataInterfaces.SuggestItems[],
        currentItem: null as DataInterfaces.SuggestItems | null,
        search: "",
        loading: false,
        error: null as unknown | null,
    },
    reducers: {
        setProducts: (state, action) => {
            state.items = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProductAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(addProductAsync.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.loading = false;
            })
            .addCase(addProductAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
        builder
            .addCase(deleteProductAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProductAsync.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteProductAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
        builder
            .addCase(getProductByIdAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductByIdAsync.fulfilled, (state, action) => {
                state.currentItem = action.payload;
                state.loading = false;
            })
            .addCase(getProductByIdAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
        builder
            .addCase(updateProductAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProductAsync.fulfilled, (state, action) => {
                const index = state.items.findIndex(
                    (item) => item.id === action.payload.id
                );
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateProductAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const { setProducts, setSearch } = productSlice.actions;

export default productSlice.reducer;
