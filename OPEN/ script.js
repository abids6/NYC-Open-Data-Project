let output, result, mapObj;

let data = [
  {
    "incident_key": "1",
    "occur_date": "2023-12-31",
    "occur_time": "23:45:00",
    "boro": "BROOKLYN",
    "precinct": "73",
    "statistical_murder_flag": "false",
    "vic_age_group": "25-44",
    "latitude": "40.669",
    "longitude": "-73.910"
  },
  {
    "incident_key": "2",
    "occur_date": "2023-12-30",
    "occur_time": "21:10:00",
    "boro": "BRONX",
    "precinct": "44",
    "statistical_murder_flag": "false",
    "vic_age_group": "18-24",
    "latitude": "40.837",
    "longitude": "-73.921"
  },
  {
    "incident_key": "3",
    "occur_date": "2023-12-29",
    "occur_time": "19:25:00",
    "boro": "QUEENS",
    "precinct": "103",
    "statistical_murder_flag": "false",
    "vic_age_group": "25-44",
    "latitude": "40.704",
    "longitude": "-73.792"
  },
  {
    "incident_key": "4",
    "occur_date": "2023-12-28",
    "occur_time": "17:30:00",
    "boro": "MANHATTAN",
    "precinct": "32",
    "statistical_murder_flag": "true",
    "vic_age_group": "25-44",
    "latitude": "40.813",
    "longitude": "-73.945"
  },
  {
    "incident_key": "5",
    "occur_date": "2023-12-27",
    "occur_time": "15:15:00",
    "boro": "STATEN ISLAND",
    "precinct": "120",
    "statistical_murder_flag": "false",
    "vic_age_group": "45-64",
    "latitude": "40.626",
    "longitude": "-74.077"
  },
  {
    "incident_key": "6",
    "occur_date": "2023-12-26",
    "occur_time": "12:10:00",
    "boro": "BROOKLYN",
    "precinct": "75",
    "statistical_murder_flag": "false",
    "vic_age_group": "18-24",
    "latitude": "40.678",
    "longitude": "-73.944"
  },
  {
    "incident_key": "7",
    "occur_date": "2023-12-25",
    "occur_time": "20:05:00",
    "boro": "BRONX",
    "precinct": "46",
    "statistical_murder_flag": "true",
    "vic_age_group": "25-44",
    "latitude": "40.855",
    "longitude": "-73.907"
  },
  {
    "incident_key": "8",
    "occur_date": "2023-12-24",
    "occur_time": "18:40:00",
    "boro": "QUEENS",
    "precinct": "113",
    "statistical_murder_flag": "false",
    "vic_age_group": "45-64",
    "latitude": "40.681",
    "longitude": "-73.765"
  },
  {
    "incident_key": "9",
    "occur_date": "2023-12-23",
    "occur_time": "14:50:00",
    "boro": "MANHATTAN",
    "precinct": "25",
    "statistical_murder_flag": "false",
    "vic_age_group": "18-24",
    "latitude": "40.800",
    "longitude": "-73.937"
  },
  {
    "incident_key": "10",
    "occur_date": "2023-12-22",
    "occur_time": "22:15:00",
    "boro": "BROOKLYN",
    "precinct": "81",
    "statistical_murder_flag": "false",
    "vic_age_group": "25-44",
    "latitude": "40.682",
    "longitude": "-73.936"
  }
];

function get(id){
  return document.getElementById(id);
}

function fillDropDown(key){
  let list = [];
  let build = `<option>Select Option</option>`;

  for(let i = 0; i < data.length; i++){
    let data_field = data[i];

    if(!list.includes(data_field[key])){
      list.push(data_field[key]);
    }
  }

  list.sort();

  for(let field of list){
    build += `<option>${field}</option>`;
  }

  return build;
}

function showMap(lat, lon){
  let location = [lat, lon];

  if(!mapObj){
    mapObj = L.map("map");
  }

  let map = mapObj.setView(location, 14);

  let tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
  }).addTo(map);

  let marker = L.marker(location).addTo(map);
}

function card(info){
  let location = [info.latitude, info.longitude];

  let mapButton = "";

  if(info.latitude && info.longitude){
    mapButton = `<input type="button" onclick="showMap( ${location} )" value="Map">`;
  }

  let build = `<div class="card fitted">
                  <h3>${info.boro}</h3>
                  <h5>Precinct: ${info.precinct}</h5>
                  <p>${info.occur_date}</p>
                  <p>${info.occur_time}</p>
                  <hr>
                  <p>${info.vic_age_group}</p>
                  <p>${info.statistical_murder_flag}</p>
                  ${mapButton}
              </div>`;

  return build;
}

function init(){
  if(get("result")){
    output = get("output");
    result = get("result");

    let build = "";

    for(let i = 0; i < data.length; i++){
      let incident = data[i];
      build += card(incident);
    }

    result.innerHTML = `${data.length} Results found.`;
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
  let found = 0;

  for(let i = 0; i < data.length; i++){
    let incident = data[i];

    if(incident.boro == borough && incident.statistical_murder_flag == status){
      build += card(incident);
      found = found + 1;
    }
  }

  result.innerHTML = `${found} Results found.`;
  output.innerHTML = build;
}

function filterByPrecinctOrAge(){
  let precinct = get("precinct").value;
  let age = get("age_groups").value;
  let build = "";
  let found = 0;

  for(let i = 0; i < data.length; i++){
    let incident = data[i];

    if(incident.precinct == precinct || incident.vic_age_group == age){
      build += card(incident);
      found = found + 1;
    }
  }

  result.innerHTML = `${found} Results found.`;
  output.innerHTML = build;
}

function displayChart(data, id, type){
  let chart = c3.generate({
    bindto: '#' + id,
    data: {
      columns: data,
      type:type
    }
  });
}

function ByBorough(){
  let q = 0;
  let bk = 0;
  let bx = 0;
  let m = 0;
  let s = 0;

  for(let i = 0; i < data.length; i++){
    let incident = data[i];

    if(incident.boro == "QUEENS"){
      q = q + 1;
    }else if(incident.boro == "MANHATTAN"){
      m = m + 1;
    }else if(incident.boro == "BROOKLYN"){
      bk = bk + 1;
    }else if(incident.boro == "BRONX"){
      bx = bx + 1;
    }else if(incident.boro == "STATEN ISLAND"){
      s = s + 1;
    }
  }

  let chartData = [
    ["QUEENS", q],
    ["MANHATTAN", m],
    ["BROOKLYN", bk],
    ["BRONX", bx],
    ["STATEN ISLAND", s]
  ];

  let chartType = get("chartType").value;

  displayChart(chartData, "output", chartType);
}