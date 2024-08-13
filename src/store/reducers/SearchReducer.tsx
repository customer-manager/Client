import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCustomersBySearchText } from '../Thunk/SearchThunk';

interface SearchState {
    searchText: string;
    customers: any[];
    loading: boolean;
    error: string | null;
}
  
const initialState: SearchState = {
  searchText: '',
  customers: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomersBySearchText.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomersBySearchText.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomersBySearchText.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default searchSlice.reducer;
