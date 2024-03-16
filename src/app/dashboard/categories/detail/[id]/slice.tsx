import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ItemCorsService from '../../../../service/ItemService/itemCoresponding';

export const addItemCorrAsync = createAsyncThunk(
    "itemCorresponding/addNew",
    async (corr: DataInterfaces.ItemCorresponding[], { rejectWithValue }) => {
        try {
            const response = await ItemCorsService.addItemCor(
                corr
            );
            return response.data;
        } catch (error: any) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteItemCorrAsync = createAsyncThunk(
    "itemCorresponding/delete",
    async (corrId: string, { rejectWithValue }) => {
        try {
            const response = await ItemCorsService.deleteItemCor(corrId);
            return corrId;
        } catch (error: any) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const getItemCorrByIdAsync = createAsyncThunk(
    "itemCorresponding/getById",
    async (corrId: string, { rejectWithValue }) => {
        try {
            const response = await ItemCorsService.getItemCorById(corrId);
            return response.data;
        } catch (error: any) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateItemCorrAsync = createAsyncThunk(
    "itemCorresponding/update",
    async ({ itemId, itemCorrData }: Interfaces.UpdateItemCorrPayload, { rejectWithValue }) => {
        try {
            const response = await ItemCorsService.updateItemCor(
                itemId,
                itemCorrData
            );
            return response.data;
        } catch (error: any) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const itemCorrSlice = createSlice({
    name: "itemCorresponding",
    initialState: {
        items: [] as DataInterfaces.ItemCorresponding[],
        currentItem: null as DataInterfaces.ItemCorresponding | null,
        search: "",
        loading: false,
        error: null as unknown | null,
    },
    reducers: {
        setItemCorr: (state, action) => {
            state.items = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addItemCorrAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(addItemCorrAsync.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.loading = false;
            })
            .addCase(addItemCorrAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
        builder
            .addCase(deleteItemCorrAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteItemCorrAsync.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteItemCorrAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
        builder
            .addCase(getItemCorrByIdAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getItemCorrByIdAsync.fulfilled, (state, action) => {
                state.currentItem = action.payload;
                state.loading = false;
            })
            .addCase(getItemCorrByIdAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
        builder
            .addCase(updateItemCorrAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateItemCorrAsync.fulfilled, (state, action) => {
                const index = state.items.findIndex(
                    (item) => item.id === action.payload.id
                );
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateItemCorrAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const { setItemCorr, setSearch } = itemCorrSlice.actions;

export default itemCorrSlice.reducer;
