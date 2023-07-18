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
  showList = false;
  status : any;
  month:any;
  selDate !:string;
  monthsArr!: any[];
  
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
      // this.monthsArr.push(this.month);
      // console.log(this.monthsArr)
      this.totalDays = new Date(this.currentYear, i + 1, 0).getDate();
      console.log(this.totalDays);
      this.month.date= Array.from({ length: this.totalDays }, (_, j) => (j + 1).toString());
      for(let k = 0; k < this.month.date.length; k++){
        // this.month.days.push(new Date(this.currentYear, i , k + 1).getDay()); //for day 0123456 this.month.days.push(this.datePipe.transform(new Date(this.currentYear, i , k + 1),"dd-MM-yyyy")?.toString().slice(0,16));
        let d= this.datePipe.transform(new Date(this.currentYear, i , k + 1),"EEE dd-MM-yyyy ");
        this.month.days.push(d);
      }
      console.log(this.month);
    }
  }
  // markHoliday(day:string){
  //   // let SelDate= new Date(this.currentYear,1,day).getDate();
  //   let selDate=day.concat("holiday");
  //   console.log("marked weekend", selDate);
  //   this.month.holidays= [];
  //   this.month.holidays.push(selDate);
  //   console.log(this.month.holidays);
  // }
  dayColor(day:any){
    return {'background-color' : ( day.includes("Sat") || day.includes("Sun") || this.status== 'GovtHday') ? 'lightgreen' : 'smokewhite'}
  }
  nextYear() {
    this.month = '';
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
    this.selDate= day.concat(value);
    console.log(this.selDate);
    this.month.days[day.slice(4,6) - 1]= this.selDate;
    console.log(this.month);
  }
}