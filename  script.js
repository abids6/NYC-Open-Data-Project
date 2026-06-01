let data;

async function init(){

  let info = await fetch("data.json");
  data = await info.json();

  showCards(data);
}

function showCards(list){

  let output = document.getElementById("output");
  let build = "";

  for(let i = 0; i < list.length; i++){

    let delay = list[i];

    let boro = delay.boro;

    if(boro == undefined){
      boro = "Not Listed";
    }

    let reason = delay.reason;

    if(reason == undefined){
      reason = "No Reason Listed";
    }

    let time = delay.how_long_delayed;

    if(time == undefined){
      time = "Not Listed";
    }

    let route = delay.route_number;

    if(route == undefined){
      route = "No Route Listed";
    }

    let bus = delay.bus_no;

    if(bus == undefined){
      bus = "No Bus Number";
    }

    let company = delay.bus_company_name;

    if(company == undefined){
      company = "No Company Listed";
    }

    let students = delay.number_of_students_on_the_bus;

    if(students == undefined){
      students = "0";
    }

    let status = delay.breakdown_or_running_late;

    if(status == undefined){
      status = "Not Listed";
    }

    build += `<div class="card">`;
    build += `<h3>Bus Delay</h3>`;
    build += `<p><span class="heading">Borough:</span> ${boro}</p>`;
    build += `<p><span class="heading">Route:</span> ${route}</p>`;
    build += `<p><span class="heading">Bus Number:</span> ${bus}</p>`;
    build += `<p><span class="heading">Reason:</span> <span class="highlight">${reason}</span></p>`;
    build += `<p><span class="heading">Delay Time:</span> ${time}</p>`;
    build += `<p><span class="heading">Students:</span> ${students}</p>`;
    build += `<p><span class="heading">Status:</span> ${status}</p>`;
    build += `<p><span class="heading">Company:</span> ${company}</p>`;
    build += `</div>`;
  }

  output.innerHTML = build;
}

function filterByBorough(){

  let borough = document.getElementById("borough").value;
  let result = document.getElementById("result");

  let filtered = [];

  for(let i = 0; i < data.length; i++){

    if(data[i].boro != undefined){

      if(data[i].boro.toLowerCase() == borough.toLowerCase()){
        filtered.push(data[i]);
      }

    }

  }

  result.innerHTML = "<h3>Results Found: " + filtered.length + "</h3>";

  showCards(filtered);
}

function showAll(){

  document.getElementById("borough").value = "";
  document.getElementById("result").innerHTML = "";

  showCards(data);
}