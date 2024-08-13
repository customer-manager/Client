import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export const fetchCustomersBySearchText = createAsyncThunk(
  'search/fetchCustomersBySearchText',
  async (searchText: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/customer/search/${searchText}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);
