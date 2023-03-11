import React from 'react';
import { Chart,Filler, LineElement,Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement } from "chart.js";
import {Line} from "react-chartjs-2";
import {default as api} from '../store/apiSlide';
import { monthlyChart_Data } from '../helper/helper';

Chart.register(LineElement,Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement,Filler);

function MonthlyGraph() {
    const options = {
        responsive: true,
        maintainAspectRatio: false
    }

    const {data, isFetching, isSuccess, isError} = api.useGetLabelsQuery(); 
    let MonthlyGraphData;
    if(isFetching) {
        MonthlyGraphData = <div>Fetching</div>
    }
    else if(isSuccess) {
        MonthlyGraphData = <Line style={{cursor:'pointer'}} options={options} data={monthlyChart_Data(data)}></Line>
    }
    else if(isError){
        MonthlyGraphData = <div>Error</div>
    }

    return (
        <div className="flex justify-center mx-auto w-11/12 h-96">
            {MonthlyGraphData}
        </div>
    );
}
export default MonthlyGraph;