import React from 'react';
import 'boxicons';
import {default as api} from '../store/apiSlide';

function ListHistory() {
    const {data, isFetching, isSuccess, isError} = api.useGetLabelsQuery();
    const [deleteTransaction] = api.useDeleteTransactionMutation();
    const [updateTransaction] = api.useUpdateTransactionMutation();

    let Transactions;
    //console.log(api.useGetLabelsQuery());

    const handleClickDeleteButton = (e) =>{
        //console.log(e.target.dataset.id);
        if(!e.target.dataset.id) return 0;
        deleteTransaction({_id: e.target.dataset.id});
    }

    const handleClickUpdateButton = (e) =>{
        //console.log(e.target.dataset.id);
        if(!e.target.dataset.id) return 0;
        updateTransaction({_id: e.target.dataset.id});
    }

    if(isFetching) { // we don't have data here
        Transactions = <div>Fetching</div>;
    }else if(isSuccess) { // we have data here
        // eslint-disable-next-line no-unused-vars
        Transactions = data.map((value,index) => <Transaction category={value} key={index} handleUpdate = {handleClickUpdateButton} handleDelete = {handleClickDeleteButton}></Transaction>);
    }else if(isError) {
        Transactions = <div>Error</div>;
    }

    return (
        <div className='flex flex-col py-6 gap-3'>
            <h1 className='py-4 font-bold text-2xl'>Lịch sử</h1>
            {Transactions}
        </div>
    );
}

function Transaction({category, handleDelete, handleUpdate}){
    if(!category) return null;
    return(
        <div className='item flex justify-center bg-gray-50 py-2 rounded-lg' style={{borderRight: `8px solid ${category.color ?? "#e5e5e5"}`}}>
            <button className='px-2'> 
                <box-icon onClick={handleDelete} data-id={category._id ?? ""} size='16px' color={category.color ?? "#e5e5e5"} name='trash'></box-icon> 
            </button>
            <button>    
                <box-icon onClick={handleUpdate} data-id={category._id ?? ""} size='16px' color={category.color ?? "#e5e5e5"} type='solid' name = 'edit'></box-icon>
            </button>
            <span className='block w-full pb-3 pr-4 flex justify-center mt-2'>{category.name ?? ""}</span>
        </div>
    )
}

export default ListHistory; 

