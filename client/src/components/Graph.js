import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import Labels from "./Labels";
import { chart_Data, getTotal } from "../helper/helper";
import {default as api} from '../store/apiSlide';

Chart.register(ArcElement);

const Graph = () =>{
  const {data, isFetching, isSuccess, isError} = api.useGetLabelsQuery();
    let GraphData; 
    if(isFetching) { // we don't have data here
       GraphData = <div>Fetching</div>;
    }else if(isSuccess) {
      //console.log(getTotal(data));
      GraphData = <Doughnut style={{cursor:'pointer'}} {...chart_Data(data)}></Doughnut>
    }else if(isError) {
       GraphData = <div>Error</div>;
    }
  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative">
          {GraphData}
          <h3 className="mb-4 font-bold title text-2xl">Tổng
            <span className="block text-3xl text-emerald-400">${getTotal(data) ?? 0}</span>
          </h3> 
        </div>

        {/* Labels */}
        <div className="flex flex-col py-10 gap-4">
            <Labels></Labels>
        </div>
      </div>
    </div>
  );
}
export default Graph;