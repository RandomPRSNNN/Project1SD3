async function getGraphData() {
    let html = [['Year', 'Sales', 'Expenses']];
    const snapshot = await db.collection('graphData').orderBy('date', 'asc').get();

    snapshot.docs.map(doc =>
        html.push([doc.data().date, parseInt(doc.data().sales), parseInt(doc.data().expenses)])
    )
    return html;
}

/*CHART IMPORT*/
google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(drawChart);
async function drawChart() {
    var data = google.visualization.arrayToDataTable(await getGraphData());
    var options = {
        title: 'Company Performance',
        curveType: 'function',
        legend: {position: 'none'}
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    chart.draw(data, options);
}