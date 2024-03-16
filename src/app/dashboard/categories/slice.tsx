import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SuggestItemsService from "../../service/ItemService/suggestItem";
import CategoriesService from '../../service/ItemService/categories'

export const addCategoryAsync = createAsyncThunk(
    "categories/addNew",
    async (categoryData: DataInterfaces.CategoriesItem[], { rejectWithValue }) => {
        try {
            const response = await CategoriesService.addCategories(
                categoryData
            );
            return response.data;
        } catch (error: any) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteCategoryAsync = createAsyncThunk(
    "categories/delete",
    async (categoriesId: string, { rejectWithValue }) => {
        try {
            const response = await CategoriesService.deleteCategories(categoriesId);
            return categoriesId;
        } catch (error: any) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const getCategoryByIdAsync = createAsyncThunk(
    "categories/getById",
    async (categoriesId: string, { rejectWithValue }) => {
        try {
            const response = await CategoriesService.getCategoriesById(categoriesId);
            return response.data;
        } catch (error: any) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateCategoryAsync = createAsyncThunk(
    "categories/update",
    async ({ itemId, categoriesData }: Interfaces.UpdateCategoriesPayload, { rejectWithValue }) => {
        try {
            const response = await CategoriesService.updateCategories(
                itemId,
                categoriesData
            );
            return response.data;
        } catch (error: any) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const categorySlice = createSlice({
    name: "categories",
    initialState: {
        items: [] as DataInterfaces.CategoriesItem[],
        currentItem: null as DataInterfaces.CategoriesItem | null,
        search: "",
        loading: false,
        error: null as unknown | null,
    },
    reducers: {
        setCategories: (state, action) => {
            state.items = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCategoryAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(addCategoryAsync.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.loading = false;
            })
            .addCase(addCategoryAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
        builder
            .addCase(deleteCategoryAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.categoryId !== action.payload);
                state.loading = false;
            })
            .addCase(deleteCategoryAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
        builder
            .addCase(getCategoryByIdAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCategoryByIdAsync.fulfilled, (state, action) => {
                state.currentItem = action.payload;
                state.loading = false;
            })
            .addCase(getCategoryByIdAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
        builder
            .addCase(updateCategoryAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCategoryAsync.fulfilled, (state, action) => {
                const index = state.items.findIndex(
                    (item) => item.categoryId === action.payload.id
                );
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateCategoryAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const { setCategories, setSearch } = categorySlice.actions;

export default categorySlice.reducer;
