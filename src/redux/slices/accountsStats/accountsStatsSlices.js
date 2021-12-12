import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";


//fetch all expenses
export const fetchAccountStatsAction = createAsyncThunk('account/fetch', async (payload, { rejectWithValue, getState, dispatch }) => {
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
        const { data } = await axios.get(`${baseURL}/accounts-statistics`, config);
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
});


//Expense Slices
const accountSlices = createSlice({
    name: 'account',
    initialState: {},
    extraReducers: (builder) => {
        //fetch expenses
        builder.addCase(fetchAccountStatsAction.pending, (state, action) => {
            state.loading  = true;
        });
        builder.addCase(fetchAccountStatsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.accountDetails = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined; 
        });
        builder.addCase(fetchAccountStatsAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.msg;
        });
    },
});


export default accountSlices.reducer;
