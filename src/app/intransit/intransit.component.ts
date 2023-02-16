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
import axios from 'axios';
import { environment } from 'src/environments/environment';

declare const L: any;
@Component({
  selector: 'app-intransit',
  templateUrl: './intransit.component.html',
  styleUrls: ['./intransit.component.scss']
})
export class IntransitComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  aaaattatatat: any;
  data: any[] = [];
  $e: any;
  Available: any;
  Empty_Run: any;
  OffDuty: any;
  Maintenance: any;
  Enroute_pickup: any;
  At_pickup: any;
  Enroute_delivery: any;
  At_delivery: any;
  managment: any;
  Team_Leader: any;
  Floor_Mangnment: any;
  MXL_Team: any;
  color1: any;
  postdate: any;
  fileName1 = 'Line_MXL.csv';
  listData!: MatTableDataSource<any>;
  ID: string[] = ['VehcileNo', 'drivername', 'drivernumber', 'TimeUp', 'currentLocation', 'currentHub', 'custom'];
  fileName = 'LINE_SXL.csv';
  LOW = 'LOW';
  high = 'high';
  multiple = ['LOW', 'high'];
  li: any;
  lis: any[] = [];
  maindata: any[] = [];
  ab: any;
  L: any;
  class: string = '';
  qwe!: [];
  qqq!: any;
  xc: any;
  dataTemp: any;
  x: string = '';
  z: string = '';
  y: any[] = [];
  yab: string = '';
  distance!: any;
  searchText: any;
  now!: any;
  cvy: any;
  b!: any;
  yy: any;
  nibba: any;
  delayed12: any
  nibbi: any;
  count: any;
  vehicleData: any;
  type1: any[] = [];
  type12: any[] = [];
  int: any
  lat: any[] = []
  long: any[] = []
  origin: any[] = []
  originl: any[] = []
  destination: any[] = []
  destinationl: any[] = []
  vehiclenumber: any[] = []
  showLoadingIndicator: any;
  numbers: any;
  routes: any;
  routes12!: any;
  nibba1: any;
  nibba2: any;
  nibba3: any;
  nibba4: any;
  nibba5: any;
  nibba6: any;
  nibba7: any;
  nibba8: any;
  nibba9: any;
  nibba10: any;
  serialNumber: any;
  googlesheet: any[] = []
  googlesheet1: any[] = []
  joindata: any[] = []
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router,) {
    this.numbers = Array(6).fill(0).map((x, i) => i);
  }
  ngOnInit(): void {
    // this.watchPosition();
    const button = document.getElementById('scroll-to-top') as HTMLButtonElement;
    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        button.style.display = 'block';
      } else {
        button.style.display = 'block';
      }
    });
    var params = {
      "filters": {
        "shipmentStatus": ["Planned", "Created"],
        "customer": ["SIEMENS HEALTHCARE PRIVATE LIMITED"],
        // "origin": ["Navi Mumbai","Mumbai","Bhiwandi","Hyderabad","Bangalore","Chennai"],
        "shipmentDate": {
          "from": 1673069307455
        }
      }
    };
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
          var latitude4 = Number(datamain[i].currentLocation.latitude);
          var longitude4 = Number(datamain[i].currentLocation.longitude);
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


// setInterval(() => {
//   navigator.geolocation.getCurrentPosition((position) => {
//     var coordinates = origindata;
//     var datatr = coordinates.map(x => [parseFloat(x.split(',')[0]), parseFloat(x.split(',')[1])]);
//     var coordinates12 = destinationdata;
//     var datatr12 = coordinates12.map(x => [parseFloat(x.split(',')[0]), parseFloat(x.split(',')[1])]);
//     var coordinates14 = vehicleloaction;
//     var datatr14 = coordinates14.map(x => [parseFloat(x.split(',')[0]), parseFloat(x.split(',')[1])]);
//     var coordinates15 = vehiclenumber;
//     var datatr15 = coordinates15;
//     var coordinates16 = remaingkm;
//     var datatr16 = coordinates16;
//     console.log(datatr14)
//     const latLong1 = [12.8628,20.8025 ];
//     let mymap = L.map('map').setView(latLong1, 4);
//     L.tileLayer(
//       'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoicHVuaXRtaXN0cnkiLCJhIjoiY2wxeWx6a2wwMGR4NDNibHBqeDZibjExZiJ9.GFI87Dt8zH2pMF6QVywS5A',
//       {
//         attribution:
//           'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//         maxZoom: 18,
        
//         id: 'mapbox/streets-v11',
//         tileSize: 512,
//         zoomOffset: -1,
//         accessToken: 'pk.eyJ1IjoicHVuaXRtaXN0cnkiLCJhIjoiY2w4NGFsa3F5MDExeTQxcDVkMzc5dm5seSJ9.z3Y8JC8jThJ1e3R67u18Kg',
        
//       }
//     ).addTo(mymap);
    
//     var myIcon = L.icon({
//       iconUrl: 'http://scm.apml.in/assets/images/trip_details_icon/upcomming_point.png',
      
      
//     });
//     for (var i = 0; i < datatr12.length; i++) {
//       //  let marker = new L.marker([datatr12[i][0], datatr12[i][1]])
//       //     .bindPopup(datatr12[i][0])
//       //     .addTo(mymap);
//       //     let marker2 = new L.marker([datatr[i][0], datatr[i][1]])
//       //     .bindPopup(datatr[i][0])
//       //     .addTo(mymap);
//       let marker5 = new L.marker([datatr14[i][0], datatr14[i][1]],)
//         .bindPopup(datatr14[i][0])
//         .addTo(mymap);
//       marker5.bindPopup(`<b>${datatr15[i]}<br><span style="color:red;">${datatr16[i]}kms.</span></b>`);
//       var polygon = L.polyline([
//         [datatr12[i][0], datatr12[i][1]],
//         [datatr14[i][0], datatr14[i][1]]
//       ]).addTo(mymap);
//       var polygon1 = L.polyline([
//         [datatr[i][0], datatr[i][1]],
//         [datatr14[i][0], datatr14[i][1]]
//       ]).addTo(mymap);
//       polygon.setStyle({
//         color: 'red',
//         dashArray: '5, 5', dashOffset: '0'
//       });
//       polygon1.setStyle({
//         color: 'green',
//         dashArray: '15, 15', dashOffset: '0'
//       });
//       let circle1 = L.circle([datatr[i][0], datatr[i][1]], {
//         color: 'yellow',
//         fillColor: '#f03',
//         fillOpacity: 0.5,
//         radius: 5000
//       }).addTo(mymap);
//       let circle = L.circle([datatr12[i][0], datatr12[i][1]], {
//         color: 'red',
//         fillColor: '#252525',
//         fillOpacity: 0.5,
//         radius: 5000
//       }).addTo(mymap);
//     }
//     //     marker.bindPopup(`<b>${this.vehiclenumber}</b>`).openPopup();
//     //     let circle = L.circle(origin, {
//     //       color: 'red',
//     //       fillColor: '#f03',
//     //       fillOpacity: 0.5,
//     //       radius: 2000
//     //   }).addTo(mymap);
//     //     let circle1 = L.circle(destination, {
//     //       color: 'yellow',
//     //       fillColor: '#f03',
//     //       fillOpacity: 0.5,
//     //       radius: 2000
//     //   }).addTo(mymap);
//     //   
//     //   let polygon1 = L.polyline([
//     //     latLong,
//     //     origin
//     // ]).addTo(mymap);
//     // let popup = L.popup()
//     //   .setLatLng(latLong)
//     //   .setContent('I am Punit')
//     //   .openOn(mymap);
//   });
// }, 10000);
        
       
      })
      .catch(function (error) {
        console.log(error);
      });
    //    }
    // }
    // console.log(this.maindata,combinedResponse)
    //    for(var j =0;j<this.maindata.length;j++){
    //     this.origin.push(this.maindata[j].shipmentStages[1].hub.center.latitude)
    //     this.destination.push(this.maindata[j].shipmentStages[1].hub.center.longitude)
    //     this.originl.push(this.maindata[j].shipmentStages[0].hub.center.latitude)
    //     this.destinationl.push(this.maindata[j].shipmentStages[0].hub.center.longitude)
    //       this.lat .push(this.maindata[j].currentLocation.latitude)
    //     this.long.push(this.maindata[j].currentLocation.longitude)
    //       this.vehiclenumber.push(this.maindata[j].shipmentNumber)
    //     console.log(this.origin[j],"this is new")
    //       navigator.geolocation.getCurrentPosition((position) => {
    //         const latLong = [this.lat[0] , this.long[0]];
    //         const destination = [this.origin[0] , this.destination[0] ];
    //         const origin = [this.originl[0] , this.destinationl[0] ];
    //         console.log(
    //           `lat: ${this.lat}, lon: ${this.long}`
    //         );
    //         let mymap = L.map('map').setView(latLong, 13);
    //         L.tileLayer(
    //           'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoicHVuaXRtaXN0cnkiLCJhIjoiY2wxeWx6a2wwMGR4NDNibHBqeDZibjExZiJ9.GFI87Dt8zH2pMF6QVywS5A',
    //           {
    //             attribution:
    //               'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //             maxZoom: 18,
    //             id: 'mapbox/streets-v11',
    //             tileSize: 512,
    //             zoomOffset: -1,
    //             accessToken: 'your.mapbox.access.token',
    //           }
    //         ).addTo(mymap);
    //         var myIcon = L.icon({
    //           iconUrl: 'https://cdn-icons-png.flaticon.com/512/3061/3061718.png',
    //           iconSize: [28, 35],
    //           iconAnchor: [22, 94],
    //           popupAnchor: [-3, -76],
    //       });
    //         let marker = L.marker(latLong).addTo(mymap);
    //         marker.bindPopup(`<b>${this.vehiclenumber}</b>`).openPopup();
    //         let circle = L.circle(origin, {
    //           color: 'red',
    //           fillColor: '#f03',
    //           fillOpacity: 0.5,
    //           radius: 2000
    //       }).addTo(mymap);
    //         let circle1 = L.circle(destination, {
    //           color: 'yellow',
    //           fillColor: '#f03',
    //           fillOpacity: 0.5,
    //           radius: 2000
    //       }).addTo(mymap);
    //       let polygon = L.polyline([
    //         latLong,
    //         destination
    //     ]).addTo(mymap);
    //       let polygon1 = L.polyline([
    //         latLong,
    //         origin
    //     ]).addTo(mymap);
    //         // let popup = L.popup()
    //         //   .setLatLng(latLong)
    //         //   .setContent('I am Punit')
    //         //   .openOn(mymap);
    //       });
    //    }

    var config1 = {
      method: 'get',
    maxBodyLength: Infinity,
      url: 'https://script.googleusercontent.com/a/macros/agarwalpackers.com/echo?user_content_key=liluZGoKsVsI56pRMCbhaWgXdKTyvEzljs8wXtM7ZZwxRvYrxCKbroPEdPlGYY5qa9EQ6vY05Qi1xKcZE-Y8QzE0ZFrkxCriOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKCzuoJ5WTSD9188tqLxoWbKVeS6iIHTYzLJN6pUfYvVdeVlG5jFSmZBnga7jA1jJv2Ff-ndfXe0m_cBNwR9NdQAJQvZbyK2Sn14j10FjQKB0WW2AeJY_LhcNDLB45iwYI_Ty7jWPDs9-kALmaJ23tE4L5nWh-m0S0U&lib=Mste7nhVMiwHbCBqAdeBeQ0a1jiuL8Xjw',
      headers: { }
    };
    
    axios(config1)
    .then( (response) => {
    
    var datamain=[]
    for(var i=0;i<response.data.length;i++ ){

      if(response.data[i].rc_regn_no!="" && response.data[i].rc_regn_no!="#N/A"&&response.data[i].rc_regn_no!="Vehicle Number"){
        var obj={
          rc_regn_no:response.data[i].rc_regn_no,
          rc_fit_upto:response.data[i].rc_fit_upto,
          rc_insurance_upto:response.data[i].rc_insurance_upto,
          rc_pucc_upto:response.data[i].rc_pucc_upto,
          rc_np_upto:response.data[i].rc_np_upto,
          rc_permit_valid_upto:response.data[i].rc_permit_valid_upto
        }
        datamain.push(obj)
      } 
     
    }
      console.log(datamain,"THIS IS THE GOOGLE SHEET DATA ")
      this.googlesheet =datamain


      var config2 = {
        method: 'get',
      maxBodyLength: Infinity,
        url: 'https://script.google.com/macros/s/AKfycbxmbbtMzskQ-u6DCnprEzy1FW8SaQioZgGu4QwyncYFdLnZrZopVo1aMICFz3SEVp41eg/exec?action=getUser',
        headers: { }
      };
      
      axios(config2)
      .then( (response5)=> {
       var fasttag=[]
       for(var i=0;i<response5.data.length;i++ ){
        var obj={
          vehicelenum:response5.data[i].name,
          readerReadTime:response5.data[i].readerReadTime,
          tollPlazaGeocode:response5.data[i].tollPlazaGeocode,
          tollPlazaName:response5.data[i].tollPlazaName,
          vehicleType:response5.data[i].vehicleType,
  
        }
        fasttag.push(obj)
       }
       console.log(fasttag,"sahdbvajhsbdj")
       this.googlesheet1 =fasttag
      //  setInterval(() => {
        navigator.geolocation.getCurrentPosition((position) => {
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
          
          const latLong1 = [12.8628,45.8025 ];
          let mymap = L.map('map').setView(latLong1, 4);
          L.tileLayer(
            'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoicHVuaXRtaXN0cnkiLCJhIjoiY2wxeWx6a2wwMGR4NDNibHBqeDZibjExZiJ9.GFI87Dt8zH2pMF6QVywS5A',
            {
              attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
              maxZoom: 18,
              
              id: 'mapbox/streets-v11',
              tileSize: 512,
              zoomOffset: -1,
              accessToken: 'pk.eyJ1IjoicHVuaXRtaXN0cnkiLCJhIjoiY2w4NGFsa3F5MDExeTQxcDVkMzc5dm5seSJ9.z3Y8JC8jThJ1e3R67u18Kg',
              
            }
          ).addTo(mymap);
          
          var myIcon =  L.divIcon({
    html: '<i style="font-size:20px" class="fa-solid fa-tower-observation"></i>',

    className: 'myDivIcon'
});
          for (var i = 0; i < datatr15.length; i++) {
            console.log(datatr15[i],"HEJKSDKB",this.googlesheet1[i].vehicelenum)

            const matchingGeocodes = this.googlesheet1.map((item, index) => {
              if (item.vehiclenum === datatr15[index]) {
           
                let marker6 = new L.marker([this.googlesheet1[i].tollPlazaGeocode.split(",")[0], this.googlesheet1[i].tollPlazaGeocode.split(",")[1]],{ icon:  myIcon})
                .bindPopup(`<b>${datatr15[i]}<br><span style="color:red;">${this.googlesheet1[i].tollPlazaName}</span></b>`)
                .addTo(mymap);
                return true
              } else {
                return null; // or any other default value for non-matching elements
              }
            });


           


           
            let marker5 = new L.marker([datatr14[i][0], datatr14[i][1]],)
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
          //     marker.bindPopup(`<b>${this.vehiclenumber}</b>`).openPopup();
          //     let circle = L.circle(origin, {
          //       color: 'red',
          //       fillColor: '#f03',
          //       fillOpacity: 0.5,
          //       radius: 2000
          //   }).addTo(mymap);
          //     let circle1 = L.circle(destination, {
          //       color: 'yellow',
          //       fillColor: '#f03',
          //       fillOpacity: 0.5,
          //       radius: 2000
          //   }).addTo(mymap);
          //   
          //   let polygon1 = L.polyline([
          //     latLong,
          //     origin
          // ]).addTo(mymap);
          // let popup = L.popup()
          //   .setLatLng(latLong)
          //   .setContent('I am Punit')
          //   .openOn(mymap);
        });
      // }, );

       
      })
      
      .catch(function (error1) {
        console.log(error1);
      });










    })
    .catch(function (error) {
      console.log(error);
    });  

 

    
    
    
  }

  findNearestTime(times: string[]): string {
    const current = new Date(); // get the current time
  
    // find the difference in milliseconds between each time and the current time
    const differences = times.map(time => Math.abs(current.getTime() - new Date(time).getTime()));
  
    // find the index of the smallest difference (i.e. the nearest time)
    const nearestIndex = differences.indexOf(Math.min(...differences));
  
    // get the nearest time
    const nearestTime = times[nearestIndex];
  
    return nearestTime;
  }





  GetFullName(_a: any): string {
    var countFrom = new Date(_a).getTime();
    this.now = new Date();
    this.b = new Date(countFrom);
    this.distance = (this.now - this.b);
    var secondsInADay = 60 * 60 * 1000 * 24,
      secondsInAHour = 60 * 60 * 1000;
    let days = Math.floor(this.distance / (secondsInADay) * 1);
    let hours = Math.floor((this.distance % (secondsInADay)) / (secondsInAHour) * 1);
    let mins = Math.floor(((this.distance % (secondsInADay)) % (secondsInAHour)) / (60 * 1000) * 1);
    let secs = Math.floor((((this.distance % (secondsInADay)) % (secondsInAHour)) % (60 * 1000)) / 1000 * 1);
    let xyz = days + " d " + hours + " h " + mins + ' m ' + secs + ' s'
    if (days > 1924) {
      return '-'
    }
    return xyz;
  }
  lineofitem(_a: any) {
    return _a.length
  }




  color(_a:any){
    let date_to_check = new Date(_a);
    let now = new Date();
    let time_diff = date_to_check.getTime() - now.getTime();
    
    if (time_diff < 5 * 24 * 60 * 60 * 1000) {
       return "rc_red";
    } else if (time_diff < 30 * 24 * 60 * 60 * 1000) {
      return "rc_yellow";
    } else {
      return"rc_green";
    }
  
    
  }
  watchPosition() {
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition(
      (position) => {
        console.log(
          `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
        );
        if (position.coords.latitude === desLat) {
          navigator.geolocation.clearWatch(id);
        }
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }
  remaingkms(_a: any) {
    var kms = Math.floor(_a / 1000)
    return kms + "kms"
  }
  gotocharts() {
    this.router.navigate(['./charts']);
  }
  orderby(_a: any) {
    for (let i = 0; i < _a.length; i++) {
      if (_a[i]['fieldKey'] == "Order By") {
        this.x = _a[i]['value'];
        break
      }
    }
    return this.x
  }
  abcdefg = setInterval(() => {
    this.nibba1 = $('.table4 tr:visible').length - 1;
    this.nibba2 = $('.table4 tr:visible').length - 1;
    this.nibba3 = $('.table4 tr:visible').length - 1;
    this.nibba4 = $('.table4 tr:visible').length - 1;
    this.nibba5 = $('.table4 tr:visible').length - 1;
    this.nibba6 = $('.table4 tr:visible').length - 1;
    this.nibba7 = $('.table4 tr:has(.green)').length;
    this.nibba8 = $('.table4 tr:has(.yellow)').length;
    this.nibba9 = $('.table4 tr:has(.orange)').length;
    this.nibba10 = $('.table4 tr:has(.red)').length;
  })
  GetTimeDifference(date1: any, date2: any) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diff = d1.getTime() - d2.getTime(); // diff is in milliseconds
    const diffInSeconds = diff / 1000; // convert to seconds
    const days = Math.floor(diffInSeconds / (3600 * 24)); // convert to days
    const hours = Math.floor(diffInSeconds % (3600 * 24) / 3600); // get the remaining hours
    const minutes = Math.floor(diffInSeconds % 3600 / 60); // get the remaining minutes
    const seconds = Math.floor(diffInSeconds % 60); // get the remaining seconds
    var Time = minutes + ' m ' + seconds + 's '
    return hours
  }
  GetTimeDifference1(date1: any, date2: any) {
    let diff = 0;
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    if (d1 > d2) {
      // swap dates if d1 is later than d2
      [d1, d2] = [d2, d1];
    }
    diff = d2.getTime() - d1.getTime(); // diff is in milliseconds
    // rest of the function remains the same
    const diffInSeconds = diff / 1000; // convert to seconds
    const days = Math.floor(diffInSeconds / (3600 * 24)); // convert to days
    const hours = Math.floor(diffInSeconds % (3600 * 24) / 3600); // get the remaining hours
    const minutes = Math.floor(diffInSeconds % 3600 / 60); // get the remaining minutes
    let seconds = Math.floor(diffInSeconds % 60); // get the remaining seconds
    const Time = hours + ' h ' + minutes + ' m ' + seconds + 's ';
    return Time;
  }
  date(_a: any) {
    let milisecondValue = _a;
    let date = new Date(milisecondValue);
    return date.toLocaleString()
  }
  subtractDates(date1: number, date2: number): string {
    const difference = date1 - date2;
    // Calculate the difference in days, hours, and minutes
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    // Return the difference as a string in the format "X days Y hours Z minutes"
    return `${days} days ${hours} hours ${minutes} minutes`;
  }
  subtractDates1(date1: number, date2: number): string {
    const difference = date1 - date2;
    // Calculate the difference in days, hours, and minutes
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    // Return the difference as a string in the format "X days Y hours Z minutes"
    return `${days} days ${hours} hours ${minutes} minutes`;
  }
  kms(_a: any) {
    var roundof = _a / 1000
    return parseFloat(roundof.toFixed(2)) + ' kms';
  }
  differentdate(_a: any) {
    const currentDate = new Date();
    const currentTimestamp = currentDate.getTime();
    const expectedPickupDate = _a;
    const expectedPickupTimestamp = expectedPickupDate;
    let days, hours, minutes;
    if (expectedPickupTimestamp > currentTimestamp) {
      const difference = expectedPickupTimestamp - currentTimestamp;
      days = Math.floor(difference / (1000 * 60 * 60 * 24));
      hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    } else if (currentTimestamp > expectedPickupTimestamp) {
      const difference = currentTimestamp - expectedPickupTimestamp;
      days = Math.floor(difference / (1000 * 60 * 60 * 24)) * -1;
      hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) * -1;
      minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)) * -1;
    } else {
      days = 0;
      hours = 0;
      minutes = 0;
    }
    return days + ' d ' + hours + ' h ' + minutes + ' m ';
  }
  differentdateor_ex(_a: any, _b: any) {
    const currentDate = new Date();
    const creationTime = _b;
    const expectedPickupDate = _a;
    // console.log(expectedPickupDate)
    const expectedPickupTimestamp = expectedPickupDate;
    const difference = expectedPickupTimestamp - creationTime;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    return days + ' d ' + hours + ' h ' + minutes + ' m ';  // Output: number of whole days between current date and expected pickup date
  }
  differentdate1(_a: any) {
    const currentDate = new Date();
    const currentTimestamp = currentDate.getTime();
    const expectedPickupDate = _a;
    // console.log(expectedPickupDate)
    const expectedPickupTimestamp = expectedPickupDate;
    const difference = expectedPickupTimestamp - currentTimestamp;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    // console.log(difference,"asdasd")
    return difference;  // Output: number of whole days between current date and expected pickup date
  }
}
