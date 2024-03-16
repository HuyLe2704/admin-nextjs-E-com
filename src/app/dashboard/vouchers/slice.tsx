import VoucherService from "@/app/service/ItemService/voucher";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addVoucherAsync = createAsyncThunk(
    "vouchers/addNew",
    async (voucherData: DataInterfaces.Vouchers[], { rejectWithValue }) => {
        try {
            const response = await VoucherService.addVoucher(
                voucherData
            );
            return response.data;
        } catch (error: any) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteVoucherAsync = createAsyncThunk(
    "vouchers/delete",
    async (itemId: string, { rejectWithValue }) => {
        try {
            const response = await VoucherService.deleteVoucher(itemId);
            return itemId;
        } catch (error: any) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const getVoucherByIdAsync = createAsyncThunk(
    "vouchers/getById",
    async (itemId: string, { rejectWithValue }) => {
        try {
            const response = await VoucherService.getVoucherById(itemId);
            return response.data;
        } catch (error: any) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateVoucherAsync = createAsyncThunk(
    "vouchers/update",
    async ({ voucherId, voucherData }: Interfaces.UpdateVoucherPayload, { rejectWithValue }) => {
        try {
            const response = await VoucherService.updateVoucher(
                voucherId,
                voucherData
            );
            return response.data;
        } catch (error: any) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const vouchersSlice = createSlice({
    name: "vouchers",
    initialState: {
        vouchers: [] as DataInterfaces.Vouchers[],
        currentVoucher: null as DataInterfaces.Vouchers | null,
        search: '',
        loading: false,
        error: null as unknown | null,
    },
    reducers: {
        setVouchers: (state, action) => {
            state.vouchers = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addVoucherAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(addVoucherAsync.fulfilled, (state, action) => {
                state.vouchers.push(action.payload);
                state.loading = false;
            })
            .addCase(addVoucherAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
        builder
            .addCase(deleteVoucherAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteVoucherAsync.fulfilled, (state, action) => {
                state.vouchers = state.vouchers.filter((voucher) => voucher.id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteVoucherAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
        builder
            .addCase(getVoucherByIdAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getVoucherByIdAsync.fulfilled, (state, action) => {
                state.currentVoucher = action.payload;
                state.loading = false;
            })
            .addCase(getVoucherByIdAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
        builder
            .addCase(updateVoucherAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateVoucherAsync.fulfilled, (state, action) => {
                const index = state.vouchers.findIndex(
                    (item) => item.id === action.payload.id
                );
                if (index !== -1) {
                    state.vouchers[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateVoucherAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
})

export const { setVouchers, setSearch } = vouchersSlice.actions;

export default vouchersSlice.reducer;