import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

interface CreateCustomerDto {
    customer_name: string;
    phone_number: string;
    appointment_start_date: string;
    appointment_end_date: string;
    specialist_id:number;
    job: string;
    status: boolean;
}

interface CustomerDto {
    id?: string;
    customer_name: string;
    phone_number: string;
    appointment_start_date: string;
    appointment_end_date: string;
    specialist_id:number;
    job: string;
    status: boolean;
}

interface CustomerError {
    message: string;
}

export const CreateCustomerThunk = createAsyncThunk<CreateCustomerDto, CreateCustomerDto, { rejectValue: CustomerError }>(
    'customer/create',
    async (createCustomerDto: CreateCustomerDto, { rejectWithValue }) => {
        try {
            const response = await axios.post('/customer', createCustomerDto);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: 'Bilinmeyen bir hata oluştu.' });
        }
    }
);

export const FindAllCustomersThunk = createAsyncThunk<CustomerDto[], void, { rejectValue: CustomerError }>(
    'customer/findAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/customer');
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: 'Bilinmeyen bir hata oluştu.' });
        }
    }
);

export const FindOneCustomerThunk = createAsyncThunk<CustomerDto, string, { rejectValue: CustomerError }>(
    'customer/findOne',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/customer/${id}`);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: 'Bilinmeyen bir hata oluştu.' });
        }
    }
);

export const DeleteCustomerThunk = createAsyncThunk<CustomerDto, string, { rejectValue: CustomerError }>(
    'customer/delete',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/customer/${id}`);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: 'Bilinmeyen bir hata oluştu.' });
        }
    }
);


//update later
export const UpdateCustomerThunk = createAsyncThunk<CustomerDto, number, { rejectValue: CustomerError }>(
    'customer/update',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/customer/${id}`);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: 'Bilinmeyen bir hata oluştu.' });
        }
    }
);




