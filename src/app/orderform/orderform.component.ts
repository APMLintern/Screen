import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import axios from 'axios';
import * as $ from 'jquery';

@Component({
  selector: 'app-orderform',
  templateUrl: './orderform.component.html',
  styleUrls: ['./orderform.component.scss']
})
export class OrderformComponent implements OnInit {

  no_cctt=0

  Pickup!:string
  submitted = false;
  selectedOrigin!: string ;
  selectedLocation!: string ;
  uniquevalue!:string
  bookingbranch!: string ;
  selectedCustomer!: string;
  selectedConsignor!: string;
  selectedDestination!:string;
  selectedConsignee!:string;
  ccEmailCount = 1;
  ccEmailInputs = new Array(this.ccEmailCount);
  selectedQty = '';
  qtyOptions = [1, 2, 3, 4, 5];
  forms: any[] = [];
  form: FormGroup | undefined;
  cc = 5;
  formBuilder: any;
  updateCCInputs() {
    this.ccEmailInputs = new Array(this.ccEmailCount);
  }
  formsubmit(){
    this.submitted = true;
  }
  onOriginChange() {

    this.generateRandomAlphaNum(6)
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
  constructor(private http: HttpClient,) {
 
  }
  
  generateRandomAlphaNum(length:number) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.uniquevalue="APML"+result
    return result;
  }

  submitForm(formData: any) {
    console.log("hasvdfjvdsj",formData)
    let dateTime = formData.Pickup_Date;
let date = new Date(dateTime);
let formattedDate = date.toLocaleString("en-US", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
});
    let dateTime1 = formData.expected_Date;
let date1 = new Date(dateTime1);
let formattedDate1 = date1.toLocaleString("en-US", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
});
var formatedatelineitem = new Date(formData.Pickup_Date).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric"
})

    // var data =JSON.stringify(
    //   [{
    //    "Origin": formData.Location,
    //    "Destination": null,
    //    "Vehicle Type": formData.VehicleType,
    //    "Transportation Service": "FTL",
    //    "Customer(*)": "SIEMENS HEALTHCARE PRIVATE LIMITED",
    //    "Consignor(*)": formData.Origin,
    //    "Consignee(*)": "Unknown",
    //    "Pickup Date(DD-MM-YYYY)":"16-02-2023",
    //    "Booking Branch": formData.Booking_Branch,
    //    "Contract Number": null,
    //    "Freight": "100",
    //    "Measurement Type(*)": "weight",
    //    "Quantity(*)": "1",
    //    "Quantity UOM(*)": "Units",
    //    "cf_Order By": "Chintamani Mayeka",
    //   "cf_Vehicle-type": "formData.VehicleType",
    //   "cf_S.O Number/WBS Number": "formData.SOnumber",
    //   "cf_Consignee Name": "formData.ConsigneeName",
    //   "cf_Consignee Address": "formData.ConsigneeAddress",
    //   "cf_Consignee Pincode": "formData.ConsigneePincod",
    //   "cf_PM Name": "formData.PMName",
    //   "cf_PM Number": "formData.PMNumber",
    //   "cf_SHPL instructions": "formData.SHPL_instructions",
    //   "cf_APML Remarks": "",
    //   "cf_expected pickup date and time": "formattedDate",
    //   "cf_EXPECTED TARGET DATE:": "formattedDate1",
    //   "cf_Number of CC Email": "formData.no_cc",
    //   "cf_CC Email Id 1": "formData.cc_1",
    //   "cf_CC Email Id 2": "formData.cc_2 ",
    //   "cf_CC Email Id 3": "formData.cc_3 ",
    //   "cf_CC Email Id 4": null,
    //   "cf_CC Email Id 5": null
    //   //  "cf_Order By": formData.OrderBy,
    //   //  "cf_Vehicle-type": formData.VehicleType,
    //   //  "cf_S.O Number/WBS Number":formData.SOnumber,
    //   //  "cf_Consignee Name":formData.ConsigneeName,
    //   //  "cf_Consignee Address":formData.ConsigneeAddress,
    //   //  "cf_Consignee Pincode":formData.ConsigneePincode,
    //   //  "cf_PM Name":formData.PMName,
    //   //  "cf_PM Number":formData.PMNumber,
    //   //  "cf_SHPL instructions":formData.SHPL_instructions,
    //   //  "cf_APML Remarks":"",
    //   //  "cf_expected pickup date and time":formattedDate,
    //   //  "cf_EXPECTED TARGET DATE:":formattedDate1,
    //   //  "cf_Number of CC Email":formData.no_cc,
    //   //  "cf_CC Email Id 1":formData.cc_1 || null,
    //   //  "cf_CC Email Id 2":formData.cc_2 || null,
    //   //  "cf_CC Email Id 3":formData.cc_3 || null,
    //   //  "cf_CC Email Id 4":formData.cc_4 || null,
    //   //  "cf_CC Email Id 5":formData.cc_5 || null
    //  }
   
   
    // ]);
    
var data = JSON.stringify([
  {
    "Origin": formData.Location,
    "Destination": null,
    "Vehicle Type": null,
    "Transportation Service": "FTL",
    "Customer(*)": "SIEMENS HEALTHCARE PRIVATE LIMITED",
    "Consignor(*)": formData.Origin,
    "Consignee(*)": "Unknown",
    "Pickup Date(DD-MM-YYYY)": "16-02-2023",
    "Booking Branch": "Mumbai",
    "Contract Number": null,
    "Freight": "100",
    "Measurement Type(*)": "weight",
    "Quantity(*)": "1",
    "Quantity UOM(*)": "Units",
    "cf_Order By": formData.OrderBy,
    "cf_Vehicle-type": formData.VehicleType,
    "cf_S.O Number/WBS Number": formData.SOnumber,
    "cf_Consignee Name": formData.ConsigneeName,
    "cf_Consignee Address": formData.ConsigneeAddress,
    "cf_Consignee Pincode":formData.ConsigneePincode,
    "cf_PM Name": formData.PMName,
    "cf_PM Number": formData.PMNumber,
    "cf_SHPL instructions": formData.SHPL_instructions,
    "cf_APML Remarks": "",
    "cf_unqiuevalue":formData.unique,
    "cf_MATERIAL":formData.Material,
    "cf_expected pickup date and time": formattedDate,
    "cf_EXPECTED TARGET DATE:": formattedDate1,
    "cf_Number of CC Email": formData.no_cc,
    "cf_CC Email Id 1": formData.cc_1,
    "cf_CC Email Id 2": formData.cc_2 ,
    "cf_CC Email Id 3": formData.cc_3 ,
    "cf_CC Email Id 4": formData.cc_4 ,
    "cf_CC Email Id 5": formData.cc_5 
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
      if (response.data.data.successCount==1){
          alert("Order  has been Placed")
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
