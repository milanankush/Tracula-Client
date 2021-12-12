import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";


//Actions for Redirect
export const resetExpCreated = createAction("expense/created/reset");
export const resetExpUpdate = createAction("expense/update/reset");

//Create action
export const createExpAction = createAsyncThunk('expense/create', async (payload, { rejectWithValue, getState, dispatch }) => {
    //get user token from store
    const userToken = getState()?.users?.userAuth?.token;

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
        },
    };
    try {
        //make http call
        const { data } = await axios.post(`${baseURL}/expense`, payload, config);
        dispatch(resetExpCreated());
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
});

//fetch all expenses
export const fetchAllExpAction = createAsyncThunk('expense/fetch', async (payload, { rejectWithValue, getState, dispatch }) => {
    //get user token from store
    const userToken = getState()?.users?.userAuth?.token;

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
        },
    };
    try {
        //make http call
        const { data } = await axios.get(`${baseURL}/expense?page=${payload}`, config);
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
});

//Update action
export const updateExpAction = createAsyncThunk('expense/update', async (payload, { rejectWithValue, getState, dispatch }) => {
    //get user token from store
    const userToken = getState()?.users?.userAuth?.token;

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
        },
    };
    try {
        //make http call
        const { data } = await axios.put(`${baseURL}/expense/${payload?.id}`, payload, config);
        dispatch(resetExpUpdate());
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
});


//Expense Slices
const expenseSlices = createSlice({
    name: 'expenses',
    initialState: {},
    extraReducers: (builder) => {
        //create expense
        builder.addCase(createExpAction.pending, (state, action) => {
            state.loading  = true;
        });
        //reset action
        builder.addCase(resetExpCreated, (state, action) => {
            state.isExpCreated = true;
        });
        builder.addCase(createExpAction.fulfilled, (state, action) => {
            state.loading = false;
            state.expenseCreated = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
            state.isExpCreated = false; 
        });
        builder.addCase(createExpAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.msg;
        });


        //fetch expenses
        builder.addCase(fetchAllExpAction.pending, (state, action) => {
            state.loading  = true;
        });
        builder.addCase(fetchAllExpAction.fulfilled, (state, action) => {
            state.loading = false;
            state.expensesList = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined; 
        });
        builder.addCase(fetchAllExpAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.msg;
        });


        //update expenses
        builder.addCase(updateExpAction.pending, (state, action) => {
            state.loading  = true;
        });
        //reset action
        builder.addCase(resetExpUpdate, (state, action) => {
            state.isExpUpdated = true;
        });
        builder.addCase(updateExpAction.fulfilled, (state, action) => {
            state.loading = false;
            state.expenseUpdated = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
            state.isExpUpdated = false; 
        });
        builder.addCase(updateExpAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.msg;
        });
    },
});


export default expenseSlices.reducer;