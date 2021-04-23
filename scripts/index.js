// DOM elements
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const adminItems = document.querySelectorAll('.admin');

//set up the elements that are shown for each view
const setupUI = (user) => {
  if (user) {
    if (user.admin) {
      adminItems.forEach(item => item.style.display = 'block');
      userISAdmin = true;
    }
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // toggle user elements
    adminItems.forEach(item => item.style.display = 'none');
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
    userISAdmin = false;
  }
  setUpButtons();
  console.log("Setting UP UI (hiding)");
};

//MaterializeCSS component setup
function setUpButtons() {
  //MODALS
  let modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  //EXPANDABLE
  let expandable = document.querySelectorAll('.collapsible.expandable');
  var instance = M.Collapsible.init(expandable, {
    accordion: false
  });

  //DATEPICKER - mondays
  let datepicker = document.querySelectorAll('.datepicker');
  var instances = M.Datepicker.init(datepicker, {
    firstDay: 1,
    format: 'dd mmmm, yyyy',
    //only mondays
    disableDayFn: function (date) {
      if (date.getDay() === 1)
        return false;
      else
        return true;
    }
  });

  //Datepicker - all days
  let datepickerAllDays = document.querySelectorAll('.datepickerNotMondays');
  var instances = M.Datepicker.init(datepickerAllDays, {
    firstDay: 1,
    format: 'dd mmmm, yyyy',
    yearRange: [1955,2025],
  });

  //DROPDOWN BUTTONS
  let dropdownButtons = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(dropdownButtons, {
    closeOnClick: false,
    constrainWidth: false
  });


  //SELECTORS - multivalued
  let selectors = document.querySelectorAll('select');
  var instances = M.FormSelect.init(selectors);

  //TOOLTIPS
  let tooltips = document.querySelectorAll('.tooltipped');
  var instances = M.Tooltip.init(tooltips);

  console.log("Setting up  mCSS buttons");
}

//SETUP MATERIALIZE - once webpage done loading
document.addEventListener('DOMContentLoaded', function () {
  setUpButtons();
  M.AutoInit(undefined);
});
