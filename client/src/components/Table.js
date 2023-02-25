import React from "react";
import { default as api } from "../store/apiSlide";
import 'boxicons';
import {useForm} from 'react-hook-form';

const Table = () =>{
    const [deleteTransaction] = api.useDeleteTransactionMutation();
    const [updateTransaction] = api.useUpdateTransactionMutation();
    const {register, handleSubmit, resetField,formState: { errors }, setValue, reset} = useForm();
    const [showModal, setShowModal] = React.useState(false);
    const [updateID,setUpdateID] = React.useState(undefined);

    const handleClickUpdateBtn = (e) =>{
        setShowModal(true);
        if(!e.target.dataset.id) setUpdateID(undefined);
        //console.log(e.target.dataset);
        setUpdateID(e.target.dataset.id);

        setValue('name',e.target.dataset.name);
        setValue('type',e.target.dataset.type);
        setValue('cost',e.target.dataset.cost);
        setValue('month',e.target.dataset.month);
    }
    const onSubmit = async (data) =>{
        //console.log(typeof(data.type));
        if(!data) return {};
        await updateTransaction([
            {_id:updateID},
            {name: data.name,type: data.type, cost: data.cost, month: data.month},
        ])
        setUpdateID(undefined); 
        resetField('name');
        resetField('cost');
    }
    const handleClickDeleteBtn = (e) =>{
        if(e.target.dataset.id) deleteTransaction({_id: e.target.dataset.id});
    }

    const { data, isFetching, isSuccess, isError } = api.useGetTransactionQuery();
    //console.log(api.useGetTransactionQuery());

    //console.log(data);
    let RenderTable;
    
    if (isFetching) {
        RenderTable = <tr><td>Fetching</td></tr>;
    } else if (isSuccess) {
        let dataForSort = [...data];
        let dataSortedByCost = dataForSort.sort((a,b) => a.cost - b.cost);
        //console.log(dataSortedByCost);
        RenderTable = dataSortedByCost.map((v) => <TableData key={v._id} data={v} handleUpdate = {handleClickUpdateBtn} handleDelete = {handleClickDeleteBtn}></TableData>);
    } else if (isError) {
        RenderTable = <tr><td>Error</td></tr>;
    }

    return (
        <div className="relative overflow-x-auto shadow-2xl sm:rounded-lg w-5/6">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs flex w-full text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="flex w-full">
                        <th scope="col" className="p-4 w-1/5">Tháng</th>
                        <th scope="col" className="p-4 w-1/5 mr-14">Tên khoản chi</th>
                        <th scope="col" className="p-4 w-1/5 ">Phân loại</th>
                        <th scope="col" className="p-4 w-1/5">Số tiền đã chi</th>
                        <th scope="col" className="p-4 w-1/5">Chức năng</th>
                    </tr>
                </thead>
                <tbody className='flex flex-col items-center justify-between overflow-y-scroll w-full' style={{height: '50vh'}}>
                    {RenderTable}
                </tbody>
            </table>
            {showModal ? (
            <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="text-black border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Chỉnh sửa khoản chi
                            </h3>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
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
                                        
                                        <div className='submit-btn flex justify-end mt-6'>
                                            <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            onClick={() => setShowModal(false)}
                                            >
                                                Đóng
                                            </button>
                                            <button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">lưu thay đổi</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
            ) : null}
        </div>
    )
}

const TableData = ({data, handleDelete,handleUpdate}) =>{
    
    if(!data) return null;
    return (
        
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 flex w-full">
                <th scope="row" className="p-4 w-1/5 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data.month}</th>
                <th className="p-4 w-1/5 mr-2 pr-6">{data.name}</th>
                <th className="p-4 w-1/5 ml-8 pr-6">{data.type}</th>
                <th className="p-4 w-1/5 pl-16">${data.cost}</th>
                <th className="p-4 w-1/5 pl-11">
                    <button><box-icon onClick={handleDelete} data-id = {data._id ?? ""} color="#9097a3" name="trash"></box-icon></button>
                    <button><box-icon onClick={handleUpdate} data-cost = {data.cost} data-type = {data.type} data-name = {data.name} data-month = {data.month} data-id = {data._id ?? ""} color="#9097a3" name="edit"></box-icon></button>
                </th>
            </tr>
            
    );
}

export default Table;