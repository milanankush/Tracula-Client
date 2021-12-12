import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "../slices/expenses/expensesSlices";
import usersReducer from "../slices/users/usersSlices";
import incomeReducer from "../slices/income/incomeSlices";
import account from "../slices/accountsStats/accountsStatsSlices";
const store = configureStore({
    reducer: {
        users: usersReducer,
        expenses: expensesReducer,
        income: incomeReducer,
        account,
    },
});

export default store;