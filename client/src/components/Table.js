import React from "react";
import { default as api } from "../store/apiSlide";

const Table = () =>{
    const { data, isFetching, isSuccess, isError } = api.useGetTransactionQuery();
    //console.log(api.useGetTransactionQuery());

    let RenderTable;

    if (isFetching) {
        RenderTable = <div>Fetching</div>;
    } else if (isSuccess) {
        RenderTable = data.map((v) => <TableData key={v._id} data={v}></TableData>);
    } else if (isError) {
        RenderTable = <div>Error</div>;
    }

    return (
        <div className="relative overflow-x-auto shadow-2xl sm:rounded-lg w-5/6">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs flex w-full text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="flex w-full">
                        <th scope="col" className="p-4 w-1/4">Tháng</th>
                        <th scope="col" className="p-4 w-1/4 ">Tên khoản chi</th>
                        <th scope="col" className="p-4 w-1/4 ">Phân loại</th>
                        <th scope="col" className="p-4 w-1/4">Số tiền đã chi</th>
                    </tr>
                </thead>
                <tbody className='flex flex-col items-center justify-between overflow-y-scroll w-full' style={{height: '50vh'}}>
                    {RenderTable}
                </tbody>
            </table>
        </div>
    )
}

const TableData = ({data}) =>{
    if(!data) return null;
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 flex w-full">
            <th scope="row" className="p-4 w-1/4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data.month}</th>
            <th className="p-4 w-1/4 pl-5">{data.name}</th>
            <th className="p-4 w-1/4 pl-6">{data.type}</th>
            <th className="p-4 w-1/4 pl-14">${data.cost}</th>
        </tr>
    );
}

export default Table;
