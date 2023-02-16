import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {
  Pickup!:string
  submitted = false;
  selectedOrigin!: string ;
  selectedLocation!: string ;
  bookingbranch!: string ;
  selectedCustomer!: string;
  selectedConsignor!: string;
  selectedDestination!:string;
  selectedConsignee!:string;
  ccEmailCount = 1;
  ccEmailInputs = new Array(this.ccEmailCount);

  updateCCInputs() {
    this.ccEmailInputs = new Array(this.ccEmailCount);
  }
  formsubmit(){
    this.submitted = true;
  }
  onOriginChange() {
    switch(this.selectedOrigin) {
      case "SHPL- KOLKATA AIRPORT- SIEMENS HEALTHCARE PVT.LTD.":
          this.selectedLocation = "KOLKATA AIRPORT";
          break;
      case "SHPL- CHENNAI SEAPORT- SIEMENS HEALTHCARE PVT.LTD.":
          this.selectedLocation = "Chennai Port";
          break;
      case "SHPL- DELHI AIRPORT- SIEMENS HEALTHCARE PVT.LTD.":
          this.selectedLocation = "Delhi";
          break;
      case "SHPL - APML BHIWANDI- SIEMENS HEALTHCARE PVT LTD":
          this.selectedLocation = "Bhiwandi";
          break;
      case "SHPL- BANGALORE AIRPORT- SIEMENS HEALTHCARE PVT.LTD.":
          this.selectedLocation = "Bangalore";
          break;
      case "SHPL-APML CHENNAI- SIEMENS HEALTHCARE PVT.LTD.":
          this.selectedLocation = "Chennai";
          break;
      case "SHPL-KOLKATA WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.":
          this.selectedLocation = "Kolkata";
          break;
      case "SHPL-BANGALORE WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.":
          this.selectedLocation = "Bangalore";
          break;
      case "SHPL-CHENNAI WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.":
          this.selectedLocation = "Chennai";
          break;
      case "SHPL-DELHI WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.":
          this.selectedLocation = "Delhi";
          break;
      case "SHPL - NAVA SHEVA- SIEMENS HEALTHCARE PVT LTD":
          this.selectedLocation = "Navi Mumbai";
          break;
      case "SHPL- KOLKATA SEAPORT- SIEMENS HEALTHCARE PVT.LTD.":
          this.selectedLocation = "Kolkata";
          break;
      case "SHPL- CHENNAI AIRPORT- SIEMENS HEALTHCARE PVT.LTD":
          this.selectedLocation = "Chennai";
          break;
      case "SHPL - BGR WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD":
          this.selectedLocation = "Bhiwandi";
          break;
      case "SHPL-APML BANGALORE- SIEMENS HEALTHCARE PVT.LTD.":
          this.selectedLocation = "Bangalore";
          break;
      case "SHPL - APML CHOWK - SIEMENS HEALTHCARE PVT LTD":
          this.selectedLocation = "Navi Mumbai";
          break;
      case "SHPL - MUMBAI AIRPORT - SIEMENS HEALTHCARE PVT LTD":
          this.selectedLocation = "Mumbai";
          break;
      case "SHPL - PRESS METAL COMPANY - SIEMENS HEALTHCARE PVT. LTD.":
          this.selectedLocation = "Bhiwandi";
          break;
      case "SHPL - RAJLAXMI LOGISTICS PARK- SIEMENS HEALTHCARE PVT LTD":
          this.selectedLocation = "Bhiwandi";
          break;


    }

    this.selectedCustomer = "SIEMENS HEALTHCARE PRIVATE LIMITED";
    
    this.selectedConsignor = this.selectedOrigin;
   this.bookingbranch="Mumbai"
  }
  onDestionChange(){
    this.selectedConsignee=this.selectedDestination
  }
  constructor(private http: HttpClient) {}

  submitForm(formData: any) {
    console.log("hasvdfjvdsj",formData.Booking_Branch)
   
    var data = JSON.stringify(
      [{
       "Origin": formData.Location,
       "Destination": null,
       "Vehicle Type": "50FT HB",
       "Transportation Service": "FTL",
       "Customer(*)": "SIEMENS HEALTHCARE PRIVATE LIMITED",
       "Consignor(*)": formData.Origin,
       "Consignee(*)": "Unknown",
       "Pickup Date(DD-MM-YYYY)": "16-1-2023",
       "Booking Branch": formData.Booking_Branch       ,
       "Contract Number": null,
       "Freight": "100000",
       "Measurement Type(*)": "weight",
       "Quantity(*)": "80",
       "Quantity UOM(*)": "Units",
       "cf_Order By": formData.OrderBy,
       "cf_Destination": "noob.dest",
       "cf_Vehicle-type": formData.VehicleType,
       "cf_S.O Number/WBS Number":formData.SOnumber,
       "cf_Consignee Name":formData.ConsigneeName,
       "cf_Consignee Address":formData.ConsigneeAddress,
       "cf_Consignee Pincode":formData.ConsigneePincode,
       "cf_PM Name":formData.PMName,
       "cf_PM Number":formData.PMNumber,
       "cf_SHPL instructions":formData.SHPL_instructions,
       "cf_APML Remarks":"",
       "cf_Number of CC Email":""
     }
   
   
    ]);
    
    var config = {
      method: 'post',
      url: 'https://apis.fretron.com/automate/autoapi/run/80f5e63d-19e5-4160-817f-ba260f7fe3a4',
      headers: { 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzI0MjAxNTcsInVzZXJJZCI6Ijc3N2Q5YzIwLTEyNWYtNDhhZS04MWZjLTUzZWI2ZWM3MjZmZSIsImVtYWlsIjoiZGF0YS5zY2llbmNlQGFnYXJ3YWxwYWNrZXJzLmNvbSIsIm1vYmlsZU51bWJlciI6IjgyOTE4NDk1NjUiLCJvcmdJZCI6IjQwNTJhYjI0LTA1NDMtNGNkNC1iNTE3LTllNzhlZmVlNGZlZCIsIm5hbWUiOiJQcml5YWVzaCBQYXRlbCIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.QkU9OIMz0yf76zUJOtp7kVS3yAPZmJS1BMIiM4kxuzk', 
        'Content-Type': 'application/json'
      },
      data : data,
      
    };
    
    axios(config)
    .then( (response) => {
      console.log(data)
      console.log(response)
      if (response.data.status==200){
        this.submitted = true;
      }
    })
    .catch(function (error) {
      alert("Order has been not been Placed")
      console.log(error);
    });
    
  }
  ngOnInit(): void {
  }

}
