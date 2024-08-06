import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
    CreateCustomerThunk,
    FindAllCustomersThunk,
    FindOneCustomerThunk,
    DeleteCustomerThunk,
    UpdateCustomerThunk
} from '../Thunk/CustomerThunk';

interface CustomerState {
    loading: boolean;
    error: null | string;
    customers: any;
    customer?: any;
}

const initialState: CustomerState = {
    loading: false,
    error: null,
    customers: [],
    customer: undefined
};

const customerReducer = createSlice({
    name: 'customers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CreateCustomerThunk.fulfilled, (state, action: PayloadAction<any>) => {
                state.customers.push(action.payload);
                state.loading = false;
            })
            .addCase(CreateCustomerThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(CreateCustomerThunk.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.message;
            })

            .addCase(FindAllCustomersThunk.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.customers = action.payload;
                state.loading = false;
            })
            .addCase(FindAllCustomersThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(FindAllCustomersThunk.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(FindOneCustomerThunk.fulfilled, (state, action: PayloadAction<any>) => {
                state.customer = action.payload;
                state.loading = false;
            })
            .addCase(FindOneCustomerThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(FindOneCustomerThunk.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(DeleteCustomerThunk.fulfilled, (state, action: PayloadAction<any>) => {
                state.customers = state.customers.filter((customer:any) => customer.id !== action.payload);
                state.loading = false;
            })
            .addCase(DeleteCustomerThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(DeleteCustomerThunk.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(UpdateCustomerThunk.fulfilled, (state, action: PayloadAction<any>) => {
                const index = state.customers.findIndex((customer:any) => customer.id === action.payload.id);
                if (index !== -1) {
                    state.customers[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(UpdateCustomerThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UpdateCustomerThunk.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    }
});

export default customerReducer.reducer;
