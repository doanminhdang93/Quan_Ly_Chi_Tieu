import _ from 'lodash';

export function getSum(transaction, type){
    //console.log(transaction);
    let sum = _(transaction)
                .groupBy("type")
                .map((objs,key) => {
                    if(!type) return _.sumBy(objs,'cost')  // get sum by same type
                    return {
                        'type': key,
                        'color': objs[0].color,
                        'total': _.sumBy(objs, 'cost')
                    }
                })
                .value()
    //console.log(sum);
    return sum;
}

export function getSumByMonth(transaction, month) {
  //console.log(transaction);
  let sum = _(transaction)
            .groupBy("month")
            .map((objs,key) =>{
              if(!month) return _.sumBy(objs,'cost')   // get sum by month
              return {
                  'month': key,
                  'total': _.sumBy(objs,'cost')
              }
            })
            .value()
  //console.log(sum);
  return sum;
}

// calculate the percentage
export function getLabels(transaction) {
    let totalCost = getSum(transaction,'type'); // group by obj of same type
    //console.log(totalCost);
    let totalOfAll = _.sum(getSum(transaction));

    let percentage = _(totalCost)
                    .map(objs => _.assign(objs,{percentage: (100*objs.total)/totalOfAll}))
                    .value()
    return percentage;
}

export function chart_Data(transaction, custom){
    let bg = _.map(transaction, a => a.color);
    bg = _.uniq(bg); // return unique value of an array
    let dataValue = getSum(transaction);
    //console.log(bg);
    const config = {
      data: {
        datasets: [
          {
            data: dataValue,
            backgroundColor: bg,
            hoverOffset: 4,
            borderRadius: 30,
            spacing: 9,
          },
        ],
      },
      options: {
        cutout: 115,
      },
    };
    //console.log(config);
    return custom ?? config;
}

export function monthlyChart_Data(transaction){
  let dataValue = getSumByMonth(transaction);
  //console.log(dataValue);
  const labels = ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];
  const config = {
    labels: labels,
    datasets: [{
      label: 'Số tiền đã chi',
      data: dataValue,
      fill: true,
      borderColor: '#b851c1',
      tension: 0.1
    }]
  };
  //console.log(config);
  return config;
}

export function getTotal(transaction){
    return _.sum(getSum(transaction));
}