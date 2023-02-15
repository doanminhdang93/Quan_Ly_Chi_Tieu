import React from 'react';
import {default as api} from '../store/apiSlide';
import { getLabels } from '../helper/helper';

function Labels() {
    // console.log(api.useGetCategoriesQuery());
    const {data, isFetching, isSuccess, isError} = api.useGetLabelsQuery();
    let Transactions;
    //getSum(data,'type');  
    if(isFetching) { // we don't have data here
        Transactions = <div>Fetching</div>;
    }else if(isSuccess) {
        // eslint-disable-next-line no-unused-vars
        Transactions = getLabels(data,'type').map((value,index)=> <LabelComponent key={index} data={value}/>);
    }else if(isError) {
        Transactions = <div>Error</div>;
    }

    return (
        <>
            {Transactions}
        </>
    );
}
function LabelComponent({data}){
    if(!data) return <></>;
    return (
        <div className="labels flex justify-between">
            <div className="flex gap-2">
                <div className="w-2 h-2 rounded py-3" style={{background: data.color ?? "rgb(255, 205, 86)"}}></div>
                <h3 className="text-md">{data.type ?? ""}</h3>
            </div> 
            <h3 className='font-bold'>{Math.round(data.percentage) ?? 0}%</h3>
        </div>
    )
}

export default Labels;