import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Product, Comment } from '../../models';

const API_URL = 'http://localhost:3001';

interface ProductsState {
    items: Product[];
    comments: Comment[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ProductsState = {
    items: [],
    comments: [],
    status: 'idle',
    error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get<Product[]>(`${API_URL}/products`);
    const commentsResponse = await axios.get<Comment[]>(`${API_URL}/comments`);
    return { products: response.data, comments: commentsResponse.data };
});

export const addProduct = createAsyncThunk('products/addProduct', async (newProduct: Omit<Product, 'id'>) => {
    const response = await axios.post<Product>(`${API_URL}/products`, newProduct);
    return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId: number) => {
    await axios.delete(`${API_URL}/products/${productId}`);
    return productId;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (product: Product) => {
    const response = await axios.put<Product>(`${API_URL}/products/${product.id}`, product);
    return response.data;
});

export const addComment = createAsyncThunk('products/addComment', async (newComment: Omit<Comment, 'id'>) => {
    const response = await axios.post<Comment>(`${API_URL}/comments`, newComment);
    return response.data;
});

export const deleteComment = createAsyncThunk('products/deleteComment', async (commentId: number) => {
    await axios.delete(`${API_URL}/comments/${commentId}`);
    return commentId;
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.products;
                state.comments = action.payload.comments;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.items.push(action.payload);
            })
            .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
                state.items = state.items.filter((product) => product.id !== action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                const index = state.items.findIndex((product) => product.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(addComment.fulfilled, (state, action: PayloadAction<Comment>) => {
                state.comments.push(action.payload);
            })
            .addCase(deleteComment.fulfilled, (state, action: PayloadAction<number>) => {
                state.comments = state.comments.filter((comment) => comment.id !== action.payload);
            });
    },
});

export default productsSlice.reducer;