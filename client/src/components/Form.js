import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import {default as api} from '../store/apiSlide';

function Form() {
    const {register, handleSubmit, resetField,formState: { errors }} = useForm();

    const {data, isFetching, isSuccess, isError} = api.useGetLabelsQuery();
    const [addTransaction] = api.useAddTransactionMutation();
    const [deleteTransaction] = api.useDeleteTransactionMutation();
    const [updateTransaction] = api.useUpdateTransactionMutation();

    const [updateID,setUpdateID] = useState(undefined);
    const [ButtonTxt,setButtonTxt] = useState('Tạo khoản chi');
    const [btnColor,setButtonColor] = useState("#6366f1");
    const [inputField,setInputField] = useState({
        name: '',
        type: '',
        cost: 0
    })

    let Transactions;
    //console.log(api.useGetLabelsQuery());

    const handleClickDeleteButton = (e) =>{
        //console.log(e.target.dataset.id);
        if(!e.target.dataset.id) setUpdateID(undefined);
        deleteTransaction({_id: e.target.dataset.id});
        setButtonTxt('Tạo khoản chi');
        setButtonColor("#6366f1");
    }
    const handleClickUpdateButton = (e) =>{
        setButtonTxt('Sửa khoản chi');
        setButtonColor("#4CAF50");
        //console.log(e.target.dataset.id);
        if(!e.target.dataset.id) setUpdateID(undefined);

        //updateTransaction({_id: e.target.dataset.id});
        console.log(e.target.dataset);
        // updateTransaction({
        //     _id: e.target.dataset.id,
        //     name: 'mua xe',
        //     type: 'Chi phí phát sinh',
        //     cost: 200
        // })
        // updateTransaction([{_id: e.target.dataset.id},{
        //     name: 'mua xe',
        //     type: 'Chi phí phát sinh',
        //     cost: 200
        // }])
        setUpdateID(e.target.dataset.id);
        setInputField({
            name: e.target.dataset.name,
            type: e.target.dataset.type,
            cost: e.target.dataset.cost
        })
    }

    if(isFetching) { // we don't have data here
        Transactions = <div>Fetching</div>;
    }else if(isSuccess) { // we have data here
        // eslint-disable-next-line no-unused-vars
        Transactions = data.map((value,index) => <Transaction category={value} key={index} handleUpdate = {handleClickUpdateButton} handleDelete = {handleClickDeleteButton}></Transaction>);
    }else if(isError) {
        Transactions = <div>Error</div>;
    }
    const onSubmit = async (data) =>{
        console.log(typeof(data.type));
        if(!data) return {};
        
        if(!updateID){
            await addTransaction(data).unwrap();
        }
        else{
            await updateTransaction([
                {_id:updateID},
                {name: data.name,type: data.type, cost: data.cost},
            ])
            setUpdateID(undefined);
        }   
        setButtonTxt('Tạo khoản chi');
        setButtonColor("#6366f1");

        resetField('name');
        resetField('cost');
    }


    return (
        <div className='form max-w-sm mx-auto w-96'> 
            <h1 className='font-bold pb-6 text-2xl'>Giao dịch</h1>
            <form id='form' onSubmit={handleSubmit(onSubmit)}>
                <div className='grid gap-4'>
                    <div className='input-group'>
                        <input value={inputField.name} type='text' placeholder='Nhập tên khoản chi...' className='form-input'
                            {...register('name',
                                    {required: true,maxLength: 30}
                                )
                            }
                        ></input>
                        {errors?.name?.type === "required" && <p>Bạn cần nhập tên khoản chi</p>}
                        {errors?.name?.type === "maxLength" && (
                            <p>Tên khoản chi không được vượt quá 30 ký tự</p>
                        )}
                    </div>
                    <select value={inputField.type} className='form-input' {...register('type')}>
                        <option value='Gửi tiết kiệm' defaultValue>Gửi tiết kiệm</option>
                        <option value='Chi phí sinh hoạt'>Chi phí sinh hoạt</option>
                        <option value='Chi phí phát sinh'>Chi phí phát sinh</option>
                    </select>
                    <div className='input-group'>
                        <input value={inputField.cost} type='number' placeholder='Nhập số tiền cần chi...' className='form-input'
                            {...register('cost',
                                {required: true, min:0,}
                            )}
                        ></input>
                        {errors?.cost?.type === "required" && <p>Bạn cần nhập số tiền</p>}
                        {errors?.cost?.type === "min" && (
                            <p>Bạn cần nhập số lớn hơn 0</p>
                        )}
                    </div>
                    <div className='submit-btn'>
                        <button className="rounded-lg border py-2 text-white  w-full" style={{backgroundColor: `${btnColor}`}}>{ButtonTxt}</button>
                    </div>
                </div>
            </form>
            <div className='flex flex-col py-6 gap-3'>
                <h1 className='py-4 font-bold text-2xl'>Lịch sử</h1>
                {Transactions}
            </div>
        </div>
    );
}

function Transaction({category, handleDelete, handleUpdate}){
    if(!category) return null;
    return(
        <div className='item flex justify-center bg-gray-50 py-2 rounded-lg' style={{borderRight: `8px solid ${category.color ?? "#e5e5e5"}`}}>
            <button className='px-2'> 
                <box-icon onClick={handleDelete}  data-id={category._id ?? ""} size='16px' color={category.color ?? "#e5e5e5"} name='trash'></box-icon> 
            </button>
            <button>    
                <box-icon onClick={handleUpdate} data-cost={category.cost} data-type={category.type} data-name={category.name} data-id={category._id ?? ""} size='16px' color={category.color ?? "#e5e5e5"} type='solid' name = 'edit'></box-icon>
            </button>
            <span className='block w-full pb-3 pr-4 flex justify-center mt-2'>{category.name ?? ""}</span>
        </div>
    )
}

export default Form;