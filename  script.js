let data = [
  {
    school_year:"2025-2026",
    busbreakdown_id:"2010465",
    run_type:"General Ed AM Run",
    bus_no:"20387",
    route_number:"K3333",
    reason:"Other",
    boro:"Brooklyn",
    bus_company_name:"BORO TRANSIT, INC.",
    how_long_delayed:"46-60 Min",
    number_of_students_on_the_bus:"0",
    breakdown_or_running_late:"Running Late"
  },
  {
    school_year:"2025-2026",
    busbreakdown_id:"2010467",
    run_type:"Special Ed AM Run",
    bus_no:"1521",
    route_number:"P702",
    reason:"Heavy Traffic",
    boro:"Queens",
    bus_company_name:"HOYT TRANSPORTATION CORP.",
    how_long_delayed:"0-15 Min",
    number_of_students_on_the_bus:"1",
    breakdown_or_running_late:"Running Late"
  },
  {
    school_year:"2025-2026",
    busbreakdown_id:"2010773",
    run_type:"General Ed AM Run",
    bus_no:"2347",
    route_number:"K1306",
    reason:"Mechanical Problem",
    boro:"Brooklyn",
    bus_company_name:"ALL AMERICAN SCHOOL BUS CORP.",
    how_long_delayed:"Not Listed",
    number_of_students_on_the_bus:"2",
    breakdown_or_running_late:"Breakdown"
  },
  {
    school_year:"2025-2026",
    busbreakdown_id:"2010776",
    run_type:"General Ed AM Run",
    bus_no:"373",
    route_number:"R1172",
    reason:"Heavy Traffic",
    boro:"Staten Island",
    bus_company_name:"PIONEER TRANSPORTATION CORP",
    how_long_delayed:"46-60 Min",
    number_of_students_on_the_bus:"0",
    breakdown_or_running_late:"Running Late"
  },
  {
    school_year:"2025-2026",
    busbreakdown_id:"2010520",
    run_type:"Special Ed PM Run",
    bus_no:"11671",
    route_number:"X413",
    reason:"Won't Start",
    boro:"Bronx",
    bus_company_name:"HOYT TRANSPORTATION CORP.",
    how_long_delayed:"Not Listed",
    number_of_students_on_the_bus:"0",
    breakdown_or_running_late:"Breakdown"
  },
  {
    school_year:"2025-2026",
    busbreakdown_id:"2010517",
    run_type:"General Ed PM Run",
    bus_no:"1962",
    route_number:"Q9858",
    reason:"Other",
    boro:"Queens",
    bus_company_name:"JOFAZ TRANSPORTATION INC.",
    how_long_delayed:"31-45 Min",
    number_of_students_on_the_bus:"0",
    breakdown_or_running_late:"Running Late"
  }
];

function init(){
  displayCards(data);
}

function displayCards(list){
  let output = document.getElementById("output");

  output.innerHTML = "";

  for(let i = 0; i < list.length; i++){
    let bus = list[i];

    output.innerHTML +=
      "<div class='card'>" +
      "<h3>Bus Delay</h3>" +
      "<p><span class='heading'>Borough:</span> " + bus.boro + "</p>" +
      "<p><span class='heading'>Route:</span> " + bus.route_number + "</p>" +
      "<p><span class='heading'>Bus Number:</span> " + bus.bus_no + "</p>" +
      "<p><span class='heading'>Run Type:</span> " + bus.run_type + "</p>" +
      "<p><span class='heading'>Reason:</span> <span class='highlight'>" + bus.reason + "</span></p>" +
      "<p><span class='heading'>Delay Time:</span> " + bus.how_long_delayed + "</p>" +
      "<p><span class='heading'>Students:</span> " + bus.number_of_students_on_the_bus + "</p>" +
      "<p><span class='heading'>Status:</span> " + bus.breakdown_or_running_late + "</p>" +
      "<p><span class='heading'>Company:</span> " + bus.bus_company_name + "</p>" +
      "</div>";
  }

  if(list.length == 0){
    output.innerHTML = "<p>No results found.</p>";
  }
}

function filterByBorough(){
  let borough = document.getElementById("borough").value;
  let filtered = [];

  for(let i = 0; i < data.length; i++){
    if(data[i].boro.toLowerCase() == borough.toLowerCase()){
      filtered.push(data[i]);
    }
  }

  document.getElementById("result").innerHTML = "<h3>Results Found: " + filtered.length + "</h3>";
  displayCards(filtered);
}

function filterByStatus(){
  let status = document.getElementById("status").value;
  let filtered = [];

  for(let i = 0; i < data.length; i++){
    if(data[i].breakdown_or_running_late.toLowerCase() == status.toLowerCase()){
      filtered.push(data[i]);
    }
  }

  document.getElementById("result").innerHTML = "<h3>Results Found: " + filtered.length + "</h3>";
  displayCards(filtered);
}

function showAll(){
  document.getElementById("borough").value = "";
  document.getElementById("status").value = "";
  document.getElementById("result").innerHTML = "";

  displayCards(data);
}