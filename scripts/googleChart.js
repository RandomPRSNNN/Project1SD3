function addGraphData() {
    db.collection('graphData').add({
        date: document.getElementById('date').value,
        sales: parseInt(document.getElementById('sales').value), //parse - searching
        expenses: parseInt(document.getElementById('expenses').value),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        M.toast({html: 'Data added to graph'});
        document.getElementById('addGraphForm').reset();
    }).catch(err => {
        console.log(err.message);
    });

    drawChart();
}


async function searchingData(item, number, sign){
    console.log(item);
    console.log(number);
    console.log(sign);

    let html = '';
    //TESTING queries
    await db.collection('graphData').where(item.toLowerCase(), sign, parseInt(number)).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            console.log("GOTTEN " + doc.data().date + ": s" + doc.data().sales + " e" + doc.data().expenses);
            html += doc.id + "~ " + doc.data().date+ " - " + doc.data().sales + " " + doc.data().expenses + `<br>`;
        })
    }).catch(err => {
        console.log(err.message);
    });

    document.querySelector('#displayGottenGraphData').innerHTML = html;

}





async function getGraphData() {
    let html = [['Year', 'Sales', 'Expenses']];
    const snapshot = await db.collection('graphData').orderBy('timestamp', 'asc').get();

    snapshot.docs.map(doc =>
        html.push([doc.data().date, parseInt(doc.data().sales), parseInt(doc.data().expenses)])
    )

    return html;
}

/*CHART IMPORT*/
google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(drawChart);


async function drawChart() {

    let array = await getGraphData();

    var data = google.visualization.arrayToDataTable(
        array
    );

    var options = {
        title: 'Company Performance',
        curveType: 'function',
        legend: {position: 'none'}
    };

    var optionsLarge = {
        height: 400,
        width: 1200,
        title: 'Company Performance',
        curveType: 'function'
    };


    /*  legend: {position: 'right'},
      chartArea:{width:"80%", height: "80%"}*/


    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    var chart2 = new google.visualization.LineChart(document.getElementById('curve_chart_large'));

    chart.draw(data, options);
    chart2.draw(data, optionsLarge);
}