import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import {default as api} from '../store/apiSlide';
import 'boxicons';

function Form() {
    const {register, handleSubmit, resetField,formState: { errors }, setValue, reset} = useForm();

    const {data, isFetching, isSuccess, isError} = api.useGetLabelsQuery();
    const [addTransaction] = api.useAddTransactionMutation();
    const [deleteTransaction] = api.useDeleteTransactionMutation();
    const [updateTransaction] = api.useUpdateTransactionMutation();

    const [updateID,setUpdateID] = useState(undefined);
    const [btn,setBtn] = useState({
        btnColor: "#6366f1",
        btnText: "Tạo khoản chi"
    })

    let Transactions;
    //console.log(api.useGetLabelsQuery());

    const handleClickDeleteButton = (e) =>{
        //console.log(e.target.dataset.id);
        if(!e.target.dataset.id) setUpdateID(undefined);
        deleteTransaction({_id: e.target.dataset.id});
        setBtn({
            btnColor: "#6366f1",
            btnText: "Tạo khoản chi"
        })
        setUpdateID(undefined);
        
        setValue('name','');
        setValue('cost','');
    }
    const handleClickUpdateButton = (e) =>{
        setBtn({
            btnColor: "#4CAF50",
            btnText: "Sửa khoản chi"
        })
        //console.log(e.target.dataset.id);
        if(!e.target.dataset.id) setUpdateID(undefined);
        //console.log(e.target.dataset);
        setUpdateID(e.target.dataset.id);

        setValue('name',e.target.dataset.name);
        setValue('type',e.target.dataset.type);
        setValue('cost',e.target.dataset.cost);
        setValue('month',e.target.dataset.month);
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
        //console.log(typeof(data.type));
        if(!data) return {};

        if(!updateID){
            await addTransaction(data).unwrap();
        }
        else{
            await updateTransaction([
                {_id:updateID},
                {name: data.name,type: data.type, cost: data.cost, month: data.month},
            ])
            setUpdateID(undefined);
        }   
        setBtn({
            btnColor: "#6366f1",
            btnText: "Tạo khoản chi"
        })

        resetField('name');
        resetField('cost');
    }


    return (
        <div className='form max-w-sm mx-auto w-96'> 
            <h1 className='font-bold pb-6 text-2xl'>Giao dịch</h1>
            <form id='form' onSubmit={handleSubmit(onSubmit)} onReset={reset}>
                <div className='grid gap-4'>
                    <select className='form-input' {...register('month')}>
                        <option value='Tháng 1' defaultValue>Tháng 1</option>
                        <option value='Tháng 2'>Tháng 2</option>
                        <option value='Tháng 3'>Tháng 3</option>
                        <option value='Tháng 4'>Tháng 4</option>
                        <option value='Tháng 5'>Tháng 5</option>
                        <option value='Tháng 6'>Tháng 6</option>
                        <option value='Tháng 7'>Tháng 7</option>
                        <option value='Tháng 8'>Tháng 8</option>
                        <option value='Tháng 9'>Tháng 9</option>
                        <option value='Tháng 10'>Tháng 10</option>
                        <option value='Tháng 11'>Tháng 11</option>
                        <option value='Tháng 12'>Tháng 12</option>
                    </select>
                    <div className='input-group'>
                        <input defaultValue='' type='text' placeholder='Nhập tên khoản chi...' className='form-input'
                            {...register('name', {required: true,maxLength: 30})}
                        ></input>
                        {errors?.name?.type === "required" && <p>Bạn cần nhập tên khoản chi</p>}
                        {errors?.name?.type === "maxLength" && (
                            <p>Tên khoản chi không được vượt quá 30 ký tự</p>
                        )}
                    </div>
                    <select className='form-input' {...register('type')}>
                        <option value='Gửi tiết kiệm' defaultValue>Gửi tiết kiệm</option>
                        <option value='Chi phí sinh hoạt'>Chi phí sinh hoạt</option>
                        <option value='Chi phí phát sinh'>Chi phí phát sinh</option>
                    </select>
                    <div className='input-group'>
                        <input defaultValue = '' type='number' placeholder='Nhập số tiền cần chi...' className='form-input'
                            {...register('cost', {required: true, min:0, max:1000000000})}
                        ></input>
                        {errors?.cost?.type === "required" && <p>Bạn cần nhập số tiền</p>}
                        {errors?.cost?.type === "min" && (
                            <p>Bạn cần nhập số tiền lớn hơn $0</p>
                        )}
                        {errors?.cost?.type === "max" && (
                            <p>Bạn cần nhập số tiền nhỏ hơn $1000.000.000</p>
                        )}
                    </div>
                    <div className='submit-btn'>
                        <button className="rounded-lg border py-2 text-white  w-full" style={{backgroundColor: `${btn.btnColor}`}}>{btn.btnText}</button>
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
                <box-icon onClick={handleUpdate} data-month={category.month} data-cost={category.cost} data-type={category.type} data-name={category.name} data-id={category._id ?? ""} size='16px' color={category.color ?? "#e5e5e5"} type='solid' name = 'edit'></box-icon>
            </button>
            <span className='block w-full pb-3 pr-4 flex justify-center mt-2'>{category.name ?? ""}</span>
        </div>
    )
}

export default Form;