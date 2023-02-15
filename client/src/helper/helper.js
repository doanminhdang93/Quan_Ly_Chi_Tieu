import _ from 'lodash';

export function getSum(transaction, type){
    //console.log(transaction);
    let sum = _(transaction)
                .groupBy("type")
                .map((objs,key) => {
                    if(!type) return _.sumBy(objs,'cost')  // get sum of same type
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
    return custom ?? config;
}

export function getTotal(transaction){
    return _.sum(getSum(transaction));
}