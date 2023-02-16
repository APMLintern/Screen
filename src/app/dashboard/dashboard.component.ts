import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import * as XLSX from 'xlsx';
import { forkJoin } from 'rxjs'
import { concat, map } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { environment } from 'src/environments/environment';
import axios from 'axios';
declare const L: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient) { }
  pendingorder: any;
  li: any;
  lis: any;
  list: any;
  enrouteforpickup: any;
  atpickup: any;
  atunloading: any;
  billing: any;
  completed: any;
  intransit: any;
  ngOnInit(): void {
    var data1 = {
      "filters": {
        "consigner": [
          "SHPL- KOLKATA AIRPORT- SIEMENS HEALTHCARE PVT.LTD.",
          "SHPL- CHENNAI SEAPORT- SIEMENS HEALTHCARE PVT.LTD.",
          "SHPL- DELHI AIRPORT- SIEMENS HEALTHCARE PVT.LTD.",
          "SHPL - APML BHIWANDI- SIEMENS HEALTHCARE PVT LTD",
          "SHPL- BANGALORE AIRPORT- SIEMENS HEALTHCARE PVT.LTD.",
          "SHPL-APML CHENNAI- SIEMENS HEALTHCARE PVT.LTD.",
          "SHPL-KOLKATA WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
          "SHPL-BANGALORE WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
          "SHPL-CHENNAI WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
          "SHPL-DELHI WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
          "SHPL - NAVA SHEVA- SIEMENS HEALTHCARE PVT LTD",
          "SHPL- KOLKATA SEAPORT- SIEMENS HEALTHCARE PVT.LTD.",
          "SHPL- CHENNAI AIRPORT- SIEMENS HEALTHCARE PVT.LTD",
          "SHPL - BGR WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD",
          "SHPL-APML BANGALORE- SIEMENS HEALTHCARE PVT.LTD.",
          "SHPL - APML CHOWK - SIEMENS HEALTHCARE PVT LTD",
          "SHPL - MUMBAI AIRPORT - SIEMENS HEALTHCARE PVT LTD",
          "SHPL - PRESS METAL COMPANY - SIEMENS HEALTHCARE PVT. LTD.",
          "SHPL - RAJLAXMI LOGISTICS PARK- SIEMENS HEALTHCARE PVT LTD"
        ],
        "orderDate": {
          "from": 1675675800000
        }
      },
      "limit": 5000
    };
    var params = {
      "filters": {
        "shipmentStatus": ["Planned", "Created"],
        "origin": ["Navi Mumbai", "Mumbai", "Bhiwandi", "Hyderabad", "Bangalore", "Chennai"],
        "shipmentDate": {
          "from": 1675675800000
        }
      }
    };
    var headers = environment.Headers
    var url = environment.API_ENDPOINT
    const request1$ = this.http.post<any>(
      'https://apis.fretron.com/automate/autoapi/run/255ab0db-70ed-4933-a0cc-b30b67b70955',
      data1,
      { headers }
    );
    const request2$ = this.http.post<any>(
      url,
      params,
      { headers }
    );
    forkJoin([request1$, request2$]).pipe(
      map(([response1, response2]) => {
        // Combine the response data based on a shared identifier
        const combinedResponse: any[] = [];
        response1.data.forEach((item1: any) => {
          for (let i = 0; i < item1['lineItems'].length; i++) {
            const item2 = response2.data.find((item: any) => item['freightUnitLineItemId'] === item1['lineItems'][i]['freightUnitLineItemIds'][0]);
            if (item2) {
              combinedResponse.push({ ...item1, ...item2 });
            } else {
              combinedResponse.push({ noMatch: true, ...item1 });
            }
          }
        });
        return combinedResponse;
      })
    ).subscribe((combinedResponse) => {
      this.pendingorder = combinedResponse;
      console.log(combinedResponse.length)
    });
    var data = JSON.stringify({
      "filters": {
        "shipmentStatus": [
          "Planned",
          "Created"
        ],
        "customer": [
          "SIEMENS HEALTHCARE PRIVATE LIMITED"
        ]
      }
    });
    var config = {
      method: 'post',
      url: environment.API_ENDPOINT,
      headers: environment.Headers,
      data: data
    };
    axios(config)
      .then((response) => {
        this.li = response.data.data;
        this.lis = this.li
        this.enrouteforpickup = []; // initialize as an array
        this.atpickup = []; // initialize as an array
        this.atunloading = []; // initialize as an array
        this.billing = []; // initialize as an array
        // initialize as an array
        this.intransit = []; // initialize as an array
        for (var i = 0; i < this.lis.length; i++) {
          if (this.lis[i].shipmentTrackingStatus == 'Enroute For Pickup') {
            this.enrouteforpickup.push(this.lis[i]); // push each element into the array
          }
          else if (this.lis[i].shipmentTrackingStatus == 'At Delivery Point') {
            this.atunloading.push(this.lis[i])
          }
          else if (this.lis[i].shipmentTrackingStatus == 'At Pickup Point') {
            this.atpickup.push(this.lis[i])
          }
          else if (this.lis[i].shipmentTrackingStatus == 'Enroute For Delivery') {
            this.intransit.push(this.lis[i])
          }
        }
        console.log(this.enrouteforpickup)
      })
      .catch(function (error) {
        console.log(error);
      });
    //  SHIPPINMENT CODE ENDS HERE 
    //  SHIPPINMENT (COMPLETED) CODE  
    var dataC = JSON.stringify({
      "filters": {
        "shipmentStatus": [
          "Completed"
        ],
        "customer": [
          "SIEMENS HEALTHCARE PRIVATE LIMITED"
        ],
        "shipmentDate": {
          "from": 1675675800000
        }
      }
    });
    var configC = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://apis.fretron.com/automate/autoapi/run/67953f4a-fb2d-4548-a86f-7b4ce2d710d2',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjQ2MDI2MDIsInVzZXJJZCI6Ijc3N2Q5YzIwLTEyNWYtNDhhZS04MWZjLTUzZWI2ZWM3MjZmZSIsImVtYWlsIjoiZGF0YS5zY2llbmNlQGFnYXJ3YWxwYWNrZXJzLmNvbSIsIm1vYmlsZU51bWJlciI6IjgyOTE4NDk1NjUiLCJvcmdJZCI6IjQwNTJhYjI0LTA1NDMtNGNkNC1iNTE3LTllNzhlZmVlNGZlZCIsIm5hbWUiOiJQcml5YWVzaCBQYXRlbCIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.cJR4aISn0MMed1zPQqPxkMsZTn0_9N0W9n1D5mCzLMw',
        'Content-Type': 'application/json'
      },
      data: dataC
    };
    axios(configC)
      .then((response) => {
        this.li = response.data.data;
        this.list = this.li
        this.completed = [];
        for (var i = 0; i < this.list.length; i++) {
          if (this.list[i].shipmentStatus == 'Completed') {
            this.completed.push(this.list[i])
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    //  SHIPPINMENT (COMPLETED) ENDS CODE  
    //  MAP CODE 
    var data = JSON.stringify({
      "filters": {
        "shipmentStatus": [
          "Planned",
          "Created"
        ],
        "customer": [
          "SIEMENS HEALTHCARE PRIVATE LIMITED"
        ]
      }
    });
    var config = {
      method: 'post',
      url: environment.API_ENDPOINT,
      headers: environment.Headers,
      data: data
    };
    var datamain: any[] = []
    var origindata: any[] = []
    var destinationdata: any[] = []
    var vehicleloaction: any[] = []
    var vehiclenumber: any[] = []
    var remaingkm: any[] = []
    axios(config)
      .then((response) => {
        this.li = response.data.data;
        this.lis = this.li
        for (var i = 0; i < this.lis.length; i++) {
          if (this.lis[i].shipmentTrackingStatus == 'Enroute For Delivery') {
            datamain.push(this.lis[i])
          }
        }
        console.log(datamain, "sfdghisdfghi")
        for (var i = 0; i < datamain.length; i++) {
          remaingkm.push(Math.round(datamain[i]['shipmentStages'][1]['tripPoint']['remainingDistance']) / 1000)
          var latitude4 = (datamain[i].currentLocation !== null) ? Number(datamain[i].currentLocation.latitude) : 19.0760;
          var longitude4 = (datamain[i].currentLocation !== null) ? Number(datamain[i].currentLocation.longitude) : 72.8777;

          // var longitude4 = Number(datamain[i].currentLocation.longitude);
          vehicleloaction.push(latitude4 + ',' + longitude4);
          vehiclenumber.push(datamain[i].fleetInfo.vehicle.vehicleRegistrationNumber)
          if (datamain[i].shipmentStages[0].hub !== null && datamain[i].shipmentStages[1].hub) {
            var latitude = Number(datamain[i].shipmentStages[0].hub.center.latitude);
            var longitude = Number(datamain[i].shipmentStages[0].hub.center.longitude);
            origindata.push(latitude + ',' + longitude);
            var latitude2 = Number(datamain[i].shipmentStages[1].hub.center.latitude);
            var longitude2 = Number(datamain[i].shipmentStages[1].hub.center.longitude);
            destinationdata.push(latitude2 + ',' + longitude2);
          } else {
            // origindata.push(datamain[i].shipmentStages[0].place.center.latitude+','+datamain[i].shipmentStages[0].place.center.longitude)
            // destinationdata.push(datamain[i].shipmentStages[1].place.center.latitude+','+datamain[i].shipmentStages[1].place.center.longitude)
            var latitude = Number(datamain[i].shipmentStages[0].place.center.latitude);
            var longitude = Number(datamain[i].shipmentStages[0].place.center.longitude);
            origindata.push(latitude + ',' + longitude);
            var latitude2 = Number(datamain[i].shipmentStages[1].place.center.latitude);
            var longitude2 = Number(datamain[i].shipmentStages[1].place.center.longitude);
            destinationdata.push(latitude2 + ',' + longitude2);
          }
        }
        navigator.geolocation.getCurrentPosition( (position) => {
          var coordinates = origindata;
          var datatr = coordinates.map(x => [parseFloat(x.split(',')[0]), parseFloat(x.split(',')[1])]);
          var coordinates12 = destinationdata;
          var datatr12 = coordinates12.map(x => [parseFloat(x.split(',')[0]), parseFloat(x.split(',')[1])]);
          var coordinates14 = vehicleloaction;
          var datatr14 = coordinates14.map(x => [parseFloat(x.split(',')[0]), parseFloat(x.split(',')[1])]);
          var coordinates15 = vehiclenumber;
          var datatr15 = coordinates15;
          var coordinates16 = remaingkm;
          var datatr16 = coordinates16;
          console.log(datatr14)
          var statelatlong = [{ state: "Andhra Pradesh", capital: "Amaravati", lat: 16.5062, lng: 80.6480 },
          { state: "Arunachal Pradesh", capital: "Itanagar", lat: 27.0837, lng: 93.6106 },
          { state: "Assam", capital: "Dispur", lat: 26.1445, lng: 91.7362 },
          { state: "Bihar", capital: "Patna", lat: 25.5941, lng: 85.1376 },
          { state: "Chhattisgarh", capital: "Raipur", lat: 21.2514, lng: 81.6296 },
          { state: "Goa", capital: "Panaji", lat: 15.4909, lng: 73.8278 },
          { state: "Gujarat", capital: "Gandhinagar", lat: 23.2156, lng: 72.6369 },
          { state: "Haryana", capital: "Chandigarh", lat: 30.7333, lng: 76.7794 },
          { state: "Himachal Pradesh", capital: "Shimla", lat: 31.1048, lng: 77.1734 },
          { state: "Jharkhand", capital: "Ranchi", lat: 23.3441, lng: 85.3096 },
          { state: "Karnataka", capital: "Bengaluru", lat: 12.9724, lng: 77.5907 },
          { state: "Kerala", capital: "Thiruvananthapuram", lat: 8.5241, lng: 76.9366 },
          { state: "Madhya Pradesh", capital: "Bhopal", lat: 23.2599, lng: 77.4126 },
          { state: "Maharashtra", capital: "Mumbai", lat: 19.0760, lng: 72.8777 },
          { state: "Manipur", capital: "Imphal", lat: 24.8170, lng: 93.9268 },
          { state: "Meghalaya", capital: "Shillong", lat: 25.5676, lng: 91.8862 },
          { state: "Mizoram", capital: "Aizawl", lat: 23.1645, lng: 92.9376 },
          { state: "Nagaland", capital: "Kohima", lat: 25.6790, lng: 94.1224 },
          { state: "Odisha", capital: "Bhubaneshwar", lat: 20.2961, lng: 85.8245 },
          { state: "Punjab", capital: "Chandigarh", lat: 30.7333, lng: 76.7794 },
          { state: "Rajasthan", capital: "Jaipur", lat: 26.9124, lng: 75.7873 },
          { state: "Sikkim", capital: "Gangtok", lat: 27.3389, lng: 88.60 }]
          const latLong1 = [19.8628, 76.9629];
          let mymap = L.map('map').setView(latLong1, 4);

          // L.tileLayer(
          //   'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoicHVuaXRtaXN0cnkiLCJhIjoiY2wxeWx6a2wwMGR4NDNibHBqeDZibjExZiJ9.GFI87Dt8zH2pMF6QVywS5A',
          //   {
          //     attribution:
          //       'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          //     maxZoom: 18,
          //     // className: 'leaflet-container',
          //     id: 'mapbox/streets-v11',
          //     tileSize: 512,
          //     zoomOffset: -1,
          //     accessToken: 'pk.eyJ1IjoicHVuaXRtaXN0cnkiLCJhIjoiY2w4NGFsa3F5MDExeTQxcDVkMzc5dm5seSJ9.z3Y8JC8jThJ1e3R67u18Kg',
          //   }
          // ).addTo(mymap);
          var NASAGIBS_ViirsEarthAtNight2012 = L.tileLayer('https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
            attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
            bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
            minZoom: 1,
            maxZoom: 8,
            format: 'jpg',
            time: '',
            tilematrixset: 'GoogleMapsCompatible_Level'
          });
          var Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            subdomains: 'abcd',
            minZoom: 0,
            maxZoom: 20,
            ext: 'png'
          });
          mymap.addLayer(Stamen_TonerLite);
          var myIcon = L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/3061/3061718.png',
            iconSize: [28, 35],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76],
          });
          for (var i = 0; i < datatr12.length; i++) {
            //  let marker = new L.marker([datatr12[i][0], datatr12[i][1]])
            //     .bindPopup(datatr12[i][0])
            //     .addTo(mymap);
            //     let marker2 = new L.marker([datatr[i][0], datatr[i][1]])
            //     .bindPopup(datatr[i][0])
            //     .addTo(mymap);
            let marker5 = new L.marker([datatr14[i][0], datatr14[i][1]])
              .bindPopup(datatr14[i][0])
              .addTo(mymap);
            marker5.bindPopup(`<b>${datatr15[i]}<br><span style="color:red;">${datatr16[i]}kms.</span></b>`);
            var polygon = L.polyline([
              [datatr12[i][0], datatr12[i][1]],
              [datatr14[i][0], datatr14[i][1]]
            ]).addTo(mymap);
            var polygon1 = L.polyline([
              [datatr[i][0], datatr[i][1]],
              [datatr14[i][0], datatr14[i][1]]
            ]).addTo(mymap);
            polygon.setStyle({
              color: 'red',
              dashArray: '5, 5', dashOffset: '0'
            });
            polygon1.setStyle({
              color: 'green',
              dashArray: '15, 15', dashOffset: '0'
            });
            let circle1 = L.circle([datatr[i][0], datatr[i][1]], {
              color: 'yellow',
              fillColor: '#f03',
              fillOpacity: 0.5,
              radius: 5000
            }).addTo(mymap);
            let circle = L.circle([datatr12[i][0], datatr12[i][1]], {
              color: 'red',
              fillColor: '#252525',
              fillOpacity: 0.5,
              radius: 5000
            }).addTo(mymap);
          }
          for (var i = 0; i < statelatlong.length; i++) {
            let marker51 = new L.marker([statelatlong[i].lat, statelatlong[i].lng], { icon: L.divIcon({ className: 'poi', html: '<b><i style="color: green; width:50px height:60px" class="fa-solid fa-landmark-flag"></i></b>' }), iconSize: [45, 45] })
              .bindPopup(statelatlong[i].capital)
              .addTo(mymap);
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
