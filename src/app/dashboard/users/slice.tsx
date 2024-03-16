import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserRegister from "@/app/service/ItemService/userRegister";

export const deleteUserAsync = createAsyncThunk(
    "users/delete",
    async(userId: string, {rejectWithValue}) => {
        try {
            const response = await UserRegister.deleteSUsersRegister(userId);
            return userId;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const usersSlice = createSlice({
    name: "usersRegister",
    initialState: {
        users: [] as Interfaces.DataUsers[],
        search: '',
        loading: false,
        error: null as unknown | null,
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteUserAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUserAsync.fulfilled, (state, action) => {
                state.users = state.users.filter((user) => user.id !== action.payload)
            })
            .addCase(deleteUserAsync.rejected, (state, action) => {
                state.error === action.payload
                state.loading = false;
            })
    },
})

export const { setUsers, setSearch } = usersSlice.actions;

export default usersSlice.reducer;


