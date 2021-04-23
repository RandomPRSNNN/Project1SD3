//DOM elements
const reportListings = document.querySelector('.reportListings');
const reportTotals = document.querySelector('#donutDisplayOverall');

//generate report
const reportForm = document.querySelector('#report-form');
reportForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('reports').add({
        date: new Date(document.getElementById('reportDate').value),
        salesStock: parseInt(document.getElementById('reportStock').value),
        salesProduce: parseInt(document.getElementById('reportProduce').value),
        expensesDeliveries: parseInt(document.getElementById('reportOrders').value),
        expensesBills: parseInt(document.getElementById('reportBills').value),
        expensesMaintenance: parseInt(document.getElementById('reportMaintenance').value),
        expensesRent: parseInt(document.getElementById('reportRent').value),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        let date = new Date(document.getElementById('reportDate').value).getFullYear();
        let sales = parseInt(document.getElementById('reportStock').value) +
            parseInt(document.getElementById('reportProduce').value);
        let expenses = parseInt(document.getElementById('reportOrders').value) +
            parseInt(document.getElementById('reportBills').value) +
            parseInt(document.getElementById('reportMaintenance').value) +
            parseInt(document.getElementById('reportRent').value);
        addToYearlyGraph(date, sales, expenses);
        //reset form and close modal
        const modal = document.querySelector('#generate-report-modal');
        M.Modal.getInstance(modal).close();
        reportForm.reset();
        document.getElementById('reportDate').value = "";
        //display toast
        M.toast({html: 'Report created'});
    }).catch(err => {
        console.log(err.message);
    });
});

async function addToYearlyGraph(date, sales, expenses) {
    await db.collection('graphData').where("date", "==", date.toString()).get().then((snapshot) => {
        if (snapshot.empty) {
            db.collection('graphData').add({
                date: date.toString(),
                sales: parseInt(sales), //parse - searching
                expenses: parseInt(expenses),
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                console.log("No data found, created a new document")
            })
        } else {
            snapshot.docs.forEach(doc => {
                const docID = doc.id;
                const gottenExpenses = doc.data().expenses;
                const gottenSales = doc.data().expenses;

                db.collection("graphData").doc(docID).update({
                    sales: gottenSales + sales,
                    expenses: gottenExpenses + expenses
                });
            });
        }
    }).then(() => {
        drawChart();
    })
}


function leapYearCheck(year) {
    //remove all chars other than digits
    let year2 = year.replace(/^\D+/g, '');
    //return boolean if year is leap
    return ((year2 % 4 === 0) && (year2 % 100 !== 0)) || (year2 % 400 === 0);
}

async function searchReports(month, year) {
    //display expandable elements
    document.getElementById("reportsListed").style.display = "block";

    //define date search range
    let endDateSearch = '';
    if (month === "" || year === "") {
        M.toast({html: 'Please select a valid month and year'});
    } else if (month === "Jan 01") {
        endDateSearch = "Jan 31";
    } else if (month === "Feb 01") {
        if (leapYearCheck(year)) {
            endDateSearch = "Feb 29";
            console.log("Leap year");
        } else {
            endDateSearch = "Feb 28";
            console.log("Not a leap year");
        }
    } else if (month === "Mar 01") {
        endDateSearch = "Mar 31";
    } else if (month === "Apr 01") {
        endDateSearch = "Apr 30";
    } else if (month === "May 01") {
        endDateSearch = "May 31";
    } else if (month === "Jun 01") {
        endDateSearch = "Jun 30";
    } else if (month === "Jul 01") {
        endDateSearch = "Jul 31";
    } else if (month === "Aug 01") {
        endDateSearch = "Aug 31";
    } else if (month === "Sep 01") {
        endDateSearch = "Sep 30";
    } else if (month === "Oct 01") {
        endDateSearch = "Oct 31";
    } else if (month === "Nov 01") {
        endDateSearch = "Nov 30";
    } else if (month === "Dec 01") {
        endDateSearch = "Dec 31";
    }

    month = month + year;
    endDateSearch = endDateSearch + year;

    //parse to date format for searching DB
    let dateSearchStart = new Date(month);
    let dateSearchEnd = new Date(endDateSearch);

    let bills = 0
    let deliveries = 0;
    let maintenance = 0;
    let rent = 0;
    let salesStock = 0;
    let salesProduce = 0;
    let array = [['Expense', 'Total for the month']];
    let pushHTML = '';

    //get data and calculate totals
    await db.collection('reports').where("date", ">=", dateSearchStart).where("date", "<=", dateSearchEnd).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            const report = doc.data();
            const docID = doc.id;

            //expenses
            bills += doc.data().expensesBills;
            deliveries += doc.data().expensesDeliveries;
            maintenance += doc.data().expensesMaintenance;
            rent += doc.data().expensesRent;
            //sales
            salesStock += doc.data().salesStock;
            salesProduce += doc.data().salesProduce;

            //display individual reports
            let li = `<li>
              <div class="collapsible-header grey lighten-4"> ${report.date.toDate().toDateString()}</div>
              <div class="collapsible-body left-align white">
                    <table class="highlight smallText">
                        <tbody>
                        <h6 class="center-align">Expenses</h6>
                        <div class="divider"></div>
                        <tr>
                            <td><b>Bills</b></td>
                            <td>${report.expensesBills}</td>
                        </tr>
                        <tr>
                            <td><b>Deliveries</b></td>
                            <td>${report.expensesDeliveries}</td>
                        </tr>
                        <tr>
                            <td><b>Maintenence</b></td>
                            <td>${report.expensesMaintenance}</td>
                        </tr>
                        <tr>
                            <td><b>Rent</b></td>
                            <td>${report.expensesRent}</td>
                        </tr>
                        <tr>
                            <td><i>Expense Total</i></td>
                            <td>${report.expensesBills + report.expensesDeliveries +
                                report.expensesMaintenance + report.expensesRent}</td>
                        </tr>
                        </tbody></table>
                    <br>    
                    <table class="highlight smallText">
                    <tbody>
                        <h6 class="center-align">Sales</h6>
                        <div class="divider"></div>
                        <tr>
                            <td><b>Produce</b></td>
                            <td>${report.salesProduce}</td>
                        </tr>
                        <tr>
                            <td><b>Stock</b></td>
                            <td>${report.salesStock}</td>
                        </tr>
                        <tr>
                            <td><i>Sales Total</i></td>
                            <td>${report.salesProduce + report.salesStock}</td>
                        </tr>
                        </tbody></table>
                        <br><br>
                    <table class="highlight smallText">
                    <tbody>
                    <div class="divider"></div>
                    <tr>
                        <td><b>Profit</b></td>
                         <td>${(report.salesProduce + report.salesStock) - (report.expensesBills +
                                report.expensesDeliveries + report.expensesMaintenance + 
                                report.expensesRent)}</td>
                        </tr>
                        </tbody>
                        </table><br>
                        <div class="right"><a class="btn-small red tooltipped" data-position="bottom"
                         data-tooltip="This will perminently delete the report, and cannot be recovered"
                         onclick="deleteReport('${docID}')">Delete</a></div>
                        <br>
              </li>`;
            pushHTML += li;
        });
    }).catch(err => {
        console.log(err.message);
    });

    //pie title formatting
    let pieTitle = month.replace(/[0-9]/g, '') + year; //remove day
    let title = pieTitle.replace(/,/g, ''); //remove commas

    let displayTotals = `
    <table class="highlight">
         <tbody>
         <h6 class="center-align"><b>Totals for ${title}</b></h6>
              <div class="divider"></div>
              <tr>
                  <td><i>Sales</i></td>
                  <td><div class="smallText">
                  Produce: ${salesProduce}<br>
                  Stock: ${salesStock}<br></div>
                  ${salesProduce + salesStock}
                  </td>
               </tr>  
               <tr>
                  <td><i>Expenses</i></td>
                  <td>${bills + deliveries + maintenance + rent}</td>
               </tr>   
               <tr>
                  <td><b>Profit</b></td>
                  <td>${(salesProduce + salesStock) - (bills + deliveries + maintenance + rent)}</td>
               </tr> 
         </tbody>
     </table>`


    //display data if there are values
    if (bills !== 0 && deliveries !== 0 && maintenance !== 0 && rent !== 0) {
        array.push(["Bills", parseInt(bills)]);
        array.push(["Deliveries", parseInt(deliveries)]);
        array.push(["Maintenance", parseInt(maintenance)]);
        array.push(["Rent", parseInt(rent)]);
    } else {
        pushHTML = 'No data';
        displayTotals = '';
    }
    //list items on page
    reportListings.innerHTML = pushHTML;
    reportTotals.innerHTML = displayTotals;

    M.toast({html: 'Report retrieved'});
    array.push(title);
    setUpButtons();
    return array;
}

function deleteReport(docID) {
    db.collection('reports').doc(docID).delete().then(() => {
        console.log("Report deleted");
        M.toast({html: 'Report deleted'}),
            //redraw and update reports
            drawChartPie(document.getElementById('searchMonthSelector').value,
                document.getElementById('searchYearSelector').value)
    }).catch((error) => {
        console.log(error);
    })
}

google.charts.load("current", {packages: ["corechart"]});

async function drawChartPie(month, year) {
    //get array and get the title (last element in array)
    let array = await searchReports(month, year), [title] = array.slice(-1);
    //remove title
    array.pop();

    let data = google.visualization.arrayToDataTable(array);

    let options = {
        title: title + " Expenses",
        pieHole: 0.4,
        chartArea: {'width': '95%', 'height': '90%'}
    };

    let chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
}


async function getGraphData() {
    let html = [['Year', 'Sales', 'Expenses']];
    const snapshot = await db.collection('graphData').orderBy('date', 'asc').get();

    snapshot.docs.map(doc =>
        html.push([doc.data().date, parseInt(doc.data().sales), parseInt(doc.data().expenses)])
    )
    return html;
}

/*CHART IMPORT*/
google.charts.setOnLoadCallback(drawChart);

async function drawChart() {
    let array = await getGraphData();
    var data = google.visualization.arrayToDataTable(array);
    var optionsLarge = {
        height: 600,
        width: 1200,
        title: 'Company Performance',
        curveType: 'function',
        chartArea: {
            right: 150,
        },
        vAxis: {
            scaleType: 'linear'
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart_large'));
    chart.draw(data, optionsLarge);
}