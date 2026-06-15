let data = [
  {
    boro:"Brooklyn",
    route_number:"K3333",
    bus_no:"20387",
    run_type:"General Ed AM Run",
    reason:"Other",
    how_long_delayed:"46-60 Min",
    number_of_students_on_the_bus:"0",
    breakdown_or_running_late:"Running Late",
    bus_company_name:"BORO TRANSIT, INC.",
    latitude:40.6782,
    longitude:-73.9442
  },
  {
    boro:"Queens",
    route_number:"P702",
    bus_no:"1521",
    run_type:"Special Ed AM Run",
    reason:"Heavy Traffic",
    how_long_delayed:"0-15 Min",
    number_of_students_on_the_bus:"1",
    breakdown_or_running_late:"Running Late",
    bus_company_name:"HOYT TRANSPORTATION CORP.",
    latitude:40.7282,
    longitude:-73.7949
  },
  {
    boro:"Brooklyn",
    route_number:"K1306",
    bus_no:"2347",
    run_type:"General Ed AM Run",
    reason:"Mechanical Problem",
    how_long_delayed:"Not Listed",
    number_of_students_on_the_bus:"2",
    breakdown_or_running_late:"Breakdown",
    bus_company_name:"ALL AMERICAN SCHOOL BUS CORP.",
    latitude:40.6500,
    longitude:-73.9496
  },
  {
    boro:"Staten Island",
    route_number:"R1172",
    bus_no:"373",
    run_type:"General Ed AM Run",
    reason:"Heavy Traffic",
    how_long_delayed:"46-60 Min",
    number_of_students_on_the_bus:"0",
    breakdown_or_running_late:"Running Late",
    bus_company_name:"PIONEER TRANSPORTATION CORP",
    latitude:40.5795,
    longitude:-74.1502
  },
  {
    boro:"Bronx",
    route_number:"X413",
    bus_no:"11671",
    run_type:"Special Ed PM Run",
    reason:"Won't Start",
    how_long_delayed:"Not Listed",
    number_of_students_on_the_bus:"0",
    breakdown_or_running_late:"Breakdown",
    bus_company_name:"HOYT TRANSPORTATION CORP.",
    latitude:40.8448,
    longitude:-73.8648
  },
  {
    boro:"Queens",
    route_number:"Q9858",
    bus_no:"1962",
    run_type:"General Ed PM Run",
    reason:"Other",
    how_long_delayed:"31-45 Min",
    number_of_students_on_the_bus:"0",
    breakdown_or_running_late:"Running Late",
    bus_company_name:"JOFAZ TRANSPORTATION INC.",
    latitude:40.7000,
    longitude:-73.8300
  }
];

let map;
let markers;

window.onload = function(){
  makeMap();
  showCards(data);
};

function makeMap(){
  map = L.map("map").setView([40.7128, -74.0060], 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom:18
  }).addTo(map);

  markers = L.layerGroup().addTo(map);

  showMarkers(data);
}

function showMarkers(list){
  markers.clearLayers();

  for(let i = 0; i < list.length; i++){
    let bus = list[i];

    L.marker([bus.latitude, bus.longitude]).addTo(markers)
    .bindPopup(
      "<b>Bus Delay</b><br>" +
      "Borough: " + bus.boro + "<br>" +
      "Route: " + bus.route_number + "<br>" +
      "Bus Number: " + bus.bus_no + "<br>" +
      "Reason: " + bus.reason + "<br>" +
      "Status: " + bus.breakdown_or_running_late
    );
  }
}

function showCards(list){
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

function searchBorough(){
  let borough = document.getElementById("borough").value.toLowerCase();
  let filtered = [];

  for(let i = 0; i < data.length; i++){
    if(data[i].boro.toLowerCase() == borough){
      filtered.push(data[i]);
    }
  }

  document.getElementById("result").innerHTML = "<h3>Results Found: " + filtered.length + "</h3>";

  showCards(filtered);
  showMarkers(filtered);
}

function searchStatus(){
  let status = document.getElementById("status").value.toLowerCase();
  let filtered = [];

  for(let i = 0; i < data.length; i++){
    if(data[i].breakdown_or_running_late.toLowerCase() == status){
      filtered.push(data[i]);
    }
  }

  document.getElementById("result").innerHTML = "<h3>Results Found: " + filtered.length + "</h3>";

  showCards(filtered);
  showMarkers(filtered);
}

function showAll(){
  document.getElementById("borough").value = "";
  document.getElementById("status").value = "";
  document.getElementById("result").innerHTML = "";

  showCards(data);
  showMarkers(data);
}