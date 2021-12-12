import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";


//Actions for Redirect
export const resetIncCreated = createAction("income/created/reset");
export const resetIncUpdate = createAction("income/update/reset");

//Create action
export const createIncomeAction = createAsyncThunk('income/create', async (payload, { rejectWithValue, getState, dispatch }) => {
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
        const { data } = await axios.post(`${baseURL}/income`, payload, config);
        dispatch(resetIncCreated());
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
});

//fetch all expenses
export const fetchAllIncomeAction = createAsyncThunk('income/fetch', async (payload, { rejectWithValue, getState, dispatch }) => {
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
        const { data } = await axios.get(`${baseURL}/income?page=${payload}`, config);
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
});

//Update action
export const updateIncomeAction = createAsyncThunk('income/update', async (payload, { rejectWithValue, getState, dispatch }) => {
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
        const { data } = await axios.put(`${baseURL}/income/${payload?.id}`, payload, config);
        dispatch(resetIncUpdate());
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
});

//Expense Slices
const incomeSlices = createSlice({
    name: 'income',
    initialState: {},
    extraReducers: (builder) => {
        //create expense
        builder.addCase(createIncomeAction.pending, (state, action) => {
            state.loading  = true;
        });
        //reset action
        builder.addCase(resetIncCreated, (state, action) => {
            state.isIncCreated = true;
        });
        builder.addCase(createIncomeAction.fulfilled, (state, action) => {
            state.loading = false;
            state.incomeCreated = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
            state.isIncCreated = false; 
        });
        builder.addCase(createIncomeAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.msg;
        });


        //fetch expenses
        builder.addCase(fetchAllIncomeAction.pending, (state, action) => {
            state.loading  = true;
        });
        builder.addCase(fetchAllIncomeAction.fulfilled, (state, action) => {
            state.loading = false;
            state.incomeList = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined; 
        });
        builder.addCase(fetchAllIncomeAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.msg;
        });


        //update expenses
        builder.addCase(updateIncomeAction.pending, (state, action) => {
            state.loading  = true;
        });
        //reset action
        builder.addCase(resetIncUpdate, (state, action) => {
            state.isIncUpdated = true;
        });
        builder.addCase(updateIncomeAction.fulfilled, (state, action) => {
            state.loading = false;
            state.incomeUpdated = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined; 
            state.isIncUpdated = false;
        });
        builder.addCase(updateIncomeAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.msg;
        });
    },
});


export default incomeSlices.reducer;