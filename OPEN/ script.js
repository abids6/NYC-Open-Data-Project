let data, output, result, mapObj;

function get(id){
  return document.getElementById(id);
}

function fillDropDown(key){
  let list = [];
  let build = `<option>Select Option</option>`
  for(let i = 0; i < data.length; i++){
    let data_field = data[i];
    if(data_field[key] != undefined && !list.includes(String(data_field[key]))){
      list.push(String(data_field[key]));
    }
  }
  list.sort();
  for(let field of list){
      build += `<option>${field}</option>`;
  }
  return build;
}

function displayChart( data, id, type ){
  let chart = c3.generate({
    bindto: '#' + id,
    data: {
      columns: data,
      type:type
    }
  });
}

function showMap(lat, lon){
  let location = [lat, lon];

  if(!mapObj){
      mapObj = L.map("map");
  } 

  let map = mapObj.setView(location, 14);

  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
  }).addTo(map);

  let marker = L.marker(location).addTo(map);
}

function card( info ){ 

  let location = [info.latitude, info.longitude];

  let mapButton = "";
  if(info.latitude && info.longitude){
    mapButton = `<input type="button" onclick="showMap( ${location} )" value="Map">`
  }

  let date = info.occur_date;
  if(date){
    date = date.substring(0,10);
  }

  let build = `<div class="card fitted">
                  <h3>${info.boro}</h3>
                  <h5>Precinct: ${info.precinct}</h5>
                  <p>${date}</p>
                  <p>${info.occur_time}</p><hr>
                  <p>${info.vic_age_group}</p>
                  <p>${info.statistical_murder_flag}</p>
                  ${mapButton}
              </div>`;
  return build;
}

async function init(){
  let link = "./data.json"
  info = await fetch(link);
  data = await info.json();

  if(get("boroughs")){
    output = get("output");
    result = get("result");

    let build = "";
    let ct = 0;

    for(let i = 0; i < data.length; i++){
      let incident = data[i];
      build += card(incident);
      ct++;
    }

    result.innerHTML = `${ct} Results found.`
    output.innerHTML = build;

    let boroughs = fillDropDown("boro");
    get("boroughs").innerHTML = boroughs;

    let statuses = fillDropDown("statistical_murder_flag");
    get("statuses").innerHTML = statuses;

    let age_groups = fillDropDown("vic_age_group");
    get("age_groups").innerHTML = age_groups;
  }
}

function filterByBoroughAndStatus(){
  let borough = get("boroughs").value;
  let status = get("statuses").value;
  let build = "";
  let ct = 0;

  for(let i = 0; i < data.length; i+=1){
    let incident = data[i];
    if(incident.boro == borough && String(incident.statistical_murder_flag) == status){
      build += card(incident);
      ct += 1;
    }
  }

  result.innerHTML = `${ct} Results found.`
  output.innerHTML = build;
}

function filterByPrecinctOrAge(){
  let precinct = get("precinct").value;
  let age = get("age_groups").value;
  let build = "";
  let ct = 0;

  for(let i = 0; i < data.length; i+=1){
    let incident = data[i];
    if(String(incident.precinct) == precinct || incident.vic_age_group == age){
      build += card(incident);
      ct += 1;
    }
  }

  result.innerHTML = `${ct} Results found.`
  output.innerHTML = build;
}

function ByBorough(){
  let q = 0, bk = 0, bx = 0, m = 0, s = 0;
  
  for(let i = 0; i < data.length; i++){
    let incident = data[i];
    if(incident.boro == "QUEENS"){
      q++;
    }else if(incident.boro == "MANHATTAN"){
      m++;
    }else if(incident.boro == "BROOKLYN"){
      bk++;
    }else if(incident.boro == "BRONX"){
      bx++;
    }else if(incident.boro == "STATEN ISLAND"){
      s++;
    }
  }

  let chartData = [
    ["QUEENS",q],
    ["MANHATTAN",m],
    ["BROOKLYN", bk],
    ["BRONX", bx],
    ["STATEN ISLAND", s]
  ]
  
  let chartType = get("chartType").value;
  
  displayChart(chartData,"output",chartType)
}