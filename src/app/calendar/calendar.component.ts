import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

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
  currentYear : any = +this.currentDate.getFullYear();
  totalDays !: any;
  datesArr: any = [];
  month:any=[];
  
  ngOnInit(){
    this.getDays();
    this.getmonthDays();
  }
  getDays() {
    for (let i = 1; i <= 31; i++) {
      this.datesArr.push(i);
    }
  }
  getmonthDays() {
    for (let i = 0; i < this.allMonths.length; i++) {
      this.month = this.allMonths[i];
      this.totalDays = new Date(this.currentYear, i + 1, 0).getDate();
      console.log(this.totalDays);
      this.month.date= Array.from({ length: this.totalDays }, (_, j) => (j + 1).toString());
      for(let k = 0; k < this.month.date.length; k++){
        // this.month.day= Array.from({ length: 7}, (_, k) => (k).toString());
        this.month.days.push(new Date(this.currentYear, i , k + 1).getDay());
      }
      console.log(this.month);
    }
  }
  dayColor(day:any){
    return {'background-color' : (day == 0 || day == 6)? 'lightgreen' : 'smokewhite'}
  }
  markHoliday(day:any){
    let SelDate= new Date(this.currentYear,1,day).getDate();
    console.log("marked weekend", SelDate);
  }
  nextYear() {
    this.currentYear += 1;
    this.getmonthDays();
  }
  prevYear() {
    this.currentYear -= 1;
  }
}