import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{

  constructor(private datePipe: DatePipe) {}
  allMonths: any = [
    { name: 'January', days: [] },
    { name: 'February', days: [] },
    { name: 'March', days: [] },
    { name: 'April', days: [] },
    { name: 'May', days: [] },
    { name: 'June', days: [] },
    { name: 'July', days: [] },
    { name: 'August', days: [] },
    { name: 'September', days: [] },
    { name: 'October', days: [] },
    { name: 'November', days: [] },
    { name: 'December', days: [] }
  ];
  currentDate: any = new Date();
  currentYear : any = this.currentDate.getFullYear();
  totalDays !: any;
  datesArr: any = [];
  showList = false;
  month:any;
  selDate !:any;
  status : any;
  displayStyle:any = "none";
  // holidays: any=["15-08-2023"];
  
  ngOnInit(){
    this.getDays();
    this.getmonthDays();
    // this.markHoliday();
  }
  getDays() {
    for (let i = 1; i <= 31; i++) {
      this.datesArr.push(i);
    }
  }
  getmonthDays(){
    for (let i = 0; i < this.allMonths.length; i++) {
      this.month = this.allMonths[i];
      this.totalDays = new Date(this.currentYear, i + 1, 0).getDate();
      // console.log(this.totalDays);
      this.month.date= Array.from({ length: this.totalDays }, (_, j) => (j + 1).toString());
      for(let k = 0; k < this.month.date.length; k++){
        // this.month.days.push(new Date(this.currentYear, i , k + 1).getDay()); //for day 0123456 this.month.days.push(this.datePipe.transform(new Date(this.currentYear, i , k + 1),"dd-MM-yyyy")?.toString().slice(0,16));
        let day= this.datePipe.transform(new Date(this.currentYear, i , k + 1),"EEE dd-MM-yyyy ");
        this.month.days.push(day);
      }
      // console.log(this.month);
    }
  }
  // markHoliday(){
  //    for (let i = 0; i <= 12; i++){
  //     for(let k = 0; k < 31; k++){
  //     if((this.allMonths.days[k]).includes(this.holidays[k])){
  //     console.log("Marked");
  //     }
  //   }
  //    }
  //   console.log(this.month.holidays);
  // }
  dayColor(day:any){
    return {'background-color' : (( day.includes("Sat") || day.includes("Sun")) ? 'lightgreen' : day.includes('G')? 'lightpink' :'smokewhite')}
  }
  nextYear() {
    this.allMonths={};
    this.currentYear += 1;
    this.getmonthDays();
  }
  prevYear() {
    this.currentYear -= 1;
  }
  toggleList(event: MouseEvent) {
    event.stopPropagation();
    this.showList = !this.showList;
  }
  selectValue(day:any, value: string) {
    this.status = value;
    this.showList = !false;
    if(day.length == 15){
      this.selDate= day.concat(value);
      }
      else{
      this.selDate= day.replace(day.charAt(15),value);
      }
    // console.log(this.selDate);
    this.allMonths[day.slice(7,9)-1].days[day.slice(4,6)-1]= this.selDate;
    console.log(this.allMonths);
  }
  openPopup(day:any){
    this.displayStyle = "block";
    this.selDate= day;
  }
  closePopup() {
    this.displayStyle = "none";
  }
}