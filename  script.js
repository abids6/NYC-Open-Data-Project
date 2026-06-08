let data;

async function init(){
  let response = await fetch("data.json");
  data = await response.json();

  displayCards(data);
}

function displayCards(list){
  let output = document.getElementById("output");

  output.innerHTML = "";

  for(let i = 0; i < list.length; i++){
    let bus = list[i];

    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML =
      "<h3>Bus Delay</h3>" +
      "<p><span class='heading'>Borough:</span> " + bus.boro + "</p>" +
      "<p><span class='heading'>Route:</span> " + bus.route_number + "</p>" +
      "<p><span class='heading'>Bus Number:</span> " + bus.bus_no + "</p>" +
      "<p><span class='heading'>Run Type:</span> " + bus.run_type + "</p>" +
      "<p><span class='heading'>Reason:</span> <span class='highlight'>" + bus.reason + "</span></p>" +
      "<p><span class='heading'>Delay Time:</span> " + bus.how_long_delayed + "</p>" +
      "<p><span class='heading'>Students:</span> " + bus.number_of_students_on_the_bus + "</p>" +
      "<p><span class='heading'>Status:</span> " + bus.breakdown_or_running_late + "</p>" +
      "<p><span class='heading'>Company:</span> " + bus.bus_company_name + "</p>";

    output.appendChild(card);
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