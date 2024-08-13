import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/SearchBox.css";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store'; // RootState'i import et

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const optionsDate: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    const optionsTime: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // 24 saat formatında
    };

    return `${date.toLocaleDateString('tr-TR', optionsDate)} saat ${date.toLocaleTimeString('tr-TR', optionsTime)}`;
};

const SearchBox = (props:any) => {
    const dispatch = useDispatch();
    const customers = useSelector((state: RootState) => state.searchText.customers);

    useEffect(() => {
        // fetchCustomersBySearchText aksiyonunu dispatch etmeniz gerekebilir
        // Örneğin:
        // dispatch(fetchCustomersBySearchText(''));

        console.log("fetched Customers here=", customers);
    }, [customers, dispatch]); // customers ve dispatch'e bağlılık ekleyin

    return (
        <div className="search-box-container">
            <div className="row justify-content-center">
                {customers && props.search && customers.length > 0 ? (
                    customers.map((customer, index) => (
                        <div key={index} className="col-md-8 col-xl-6 mb-3">
                            <div className="card bg-c-blue order-card">
                                <div className="card-body">
                                    <h6 className="mb-4">{customer.customer_name || 'John Doe'}</h6>
                                    <div className="d-flex align-items-center mb-4">
                                        <i className="fa fa-phone f-left icon-size"></i>
                                        <h2 className="text-right ml-3">
                                            <span>{customer.phone_number}</span>
                                        </h2>
                                    </div>
                                    <p className="mb-2">    
                                        <strong>Randevuya </strong> <span>{customer.status}</span>
                                    </p>
                                    <p className="mb-2">
                                        <strong>Yapılan işlem:</strong> <span>{customer.job}</span>
                                    </p>
                                    {customer.status==="Geldi" ? <p className="mb-2">
                                        <strong>Randevuya Geldiği Tarih:</strong> <span>{formatDate(customer.appointment_start_date)}</span>
                                    </p> : <><strong>Randevuya Geleceği Tarih:</strong> <span>{formatDate(customer.appointment_start_date)}</span></>}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default SearchBox;
