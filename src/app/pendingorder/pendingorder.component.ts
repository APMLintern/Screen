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
@Component({
  selector: 'app-pendingorder',
  templateUrl: './pendingorder.component.html',
  styleUrls: ['./pendingorder.component.scss']
})
export class PendingorderComponent implements OnInit {
  p: number = 1;
  itemsPerPage: number = 5;
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
  lis: any;
  finalorder: any;
  finalorder1: any;
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
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router,) {
    this.numbers = Array(6).fill(0).map((x, i) => i);
  }
  ngOnInit(): void {
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
    var params1 = {
      "filters": {
        "shipmentStatus": ["Completed"],
        "customer": ["SIEMENS HEALTHCARE PRIVATE LIMITED"],
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
      this.lis = combinedResponse;
      console.log(this.lis, "asddddddddddddds");
    });
    console.error = () => { };
    var url = environment.API_ENDPOINT
    const request3$ = this.http.post<any>(
      url,
      params1,
      { headers }
    )
    forkJoin([request1$, request3$]).pipe(
      map(([response1, response3]) => {
        // Combine the response data based on a shared identifier
        const combinedResponse1: any[] = [];
        response1.data.forEach((item1: any) => {
          for (let i = 0; i < item1['lineItems'].length; i++) {
            const item3 = response3.data.find((itemt: any) => itemt['freightUnitLineItemId'] === item1['lineItems'][i]['freightUnitLineItemIds'][0]);
            if (item3) {
              combinedResponse1.push({ ...item1, ...item3 });
            } else {
              combinedResponse1.push({ noMatch: 'Inompleted', ...item1 });
            }
          }
        });
        return combinedResponse1;
      })
    ).subscribe((combinedResponse1) => {
      this.li = combinedResponse1;
      console.log(this.li, "svdjasvdjv");
    });
    console.error = () => { };



    
var data = JSON.stringify({
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
  "limit": 10000
});

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://apis.fretron.com/automate/autoapi/run/255ab0db-70ed-4933-a0cc-b30b67b70955',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjQ2MDI2MDIsInVzZXJJZCI6Ijc3N2Q5YzIwLTEyNWYtNDhhZS04MWZjLTUzZWI2ZWM3MjZmZSIsImVtYWlsIjoiZGF0YS5zY2llbmNlQGFnYXJ3YWxwYWNrZXJzLmNvbSIsIm1vYmlsZU51bWJlciI6IjgyOTE4NDk1NjUiLCJvcmdJZCI6IjQwNTJhYjI0LTA1NDMtNGNkNC1iNTE3LTllNzhlZmVlNGZlZCIsIm5hbWUiOiJQcml5YWVzaCBQYXRlbCIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.cJR4aISn0MMed1zPQqPxkMsZTn0_9N0W9n1D5mCzLMw'
  },
  data : data
};

axios(config)
.then( (response: { data: any; }) => {
  this.finalorder=response.data.data
  this.finalorder1=this.finalorder
})
.catch(function (error: any) {
  console.log(error);
});


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
  vehicletype(_a: any) {
    for (let i = 0; i < _a.length; i++) {
      if (_a[i]['fieldKey'] == "Vehicle-type") {
        this.x = _a[i]['value'];
        break
      }
    }
    return this.x
  }
  consigner(_a: any) {
    if (_a.includes("- SIEMENS HEALTHCARE PVT LTD") || _a.includes("- SIEMENS HEALTHCARE PVT.LTD")) {
      var abc = _a.split("- ")[1]
      return abc
    } else {
      return "--"
    }
    return _a
  }
  lineofitem(_a: any) {
    return _a.length
  }

  MATERIAL(_a:any){
    var abc;
    for (let i = 0; i < _a.length; i++) {
      if (_a[i]['fieldKey'] == "MATERIAL") {
        abc = _a[i]['value'];
        break
      }else{
        abc='--'
      }
    }
    return abc
  }
  Shpl_intr(_a:any){
    var abc;
    for (let i = 0; i < _a.length; i++) {
      if (_a[i]['fieldKey'] == "SHPL instructions") {
        abc = _a[i]['value'];
        break
      }else{
        abc='--'
      }
    }
    return abc
  }
  consignee(_a:any){
    var abc;
    for (let i = 0; i < _a.length; i++) {
      if (_a[i]['fieldKey'] == "Consignee Name") {
        abc = _a[i]['value'].replaceAll(' ','');
        break
      }else{
        abc="a['lineItems'][0]['consignee']['places'][0].name"
      }
    }
    return abc
  }
  expectedpickup(_a:any){
    var abc;
    for (let i = 0; i < _a.length; i++) {
      if (_a[i]['fieldKey'] == "expected pickup date and time") {
        abc = _a[i]['value'];
        break
      }else{
        abc="--"
      }
    }
    return abc
  }
  expectedtarget(_a:any){
    var abc;
    for (let i = 0; i < _a.length; i++) {
      if (_a[i]['fieldKey'] == "EXPECTED TARGET DATE:") {
        abc = _a[i]['value'];
        break
      }else{
        abc="--"
      }
    }
    return abc
  }
  apml_remark(_a:any){
    var abc;
    for (let i = 0; i < _a.length; i++) {
      if (_a[i]['fieldKey'] == "APML Remarks") {
        abc = _a[i]['value'];
        break
      }else{
        abc='--'
      }
    }
    return abc
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
    let name = this.x;
    let initials = name.split(" ").map(word => word[0]).join("");
    return initials
  }
  expecteddate(_a: any) {
    for (let i = 0; i < _a.length; i++) {
      if (_a[i]['fieldKey'] == "expected pickup date and time") {
        this.x = _a[i]['value'];
        break
      }
      else {
        this.x = "-- "
      }
    }
    let date = new Date(this.x);
    let milliseconds = date.getTime();
    return milliseconds
  }
  abcdefg = setInterval(() => {
    this.nibba1 = $('.table1 tr:visible').length - 1;
    this.nibba2 = $('.table1 tr:visible').length - 1;
    this.nibba3 = $('.table1 tr:visible').length - 1;
    this.nibba4 = $('.table1 tr:visible').length - 1;
    this.nibba5 = $('.table1 tr:visible').length - 1;
    this.nibba6 = $('.table1 tr:visible').length - 1;
    this.nibba7 = $('.table1 tr:has(.green)').length;
    this.nibba8 = $('.table1 tr:has(.yellow)').length;
    this.nibba9 = $('.table1 tr:has(.orange)').length;
    this.nibba10 = $('.table1 tr:has(.red)').length;
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
