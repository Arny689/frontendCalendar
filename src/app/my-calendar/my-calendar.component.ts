import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataDto } from '../services/data.dto';
import { HttpServiceService } from '../services/http-service.service';
import { TransferService } from '../services/transfer.service';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';
// import * as angular from "angular";

@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.scss']
})
export class MyCalendarComponent implements OnInit {

  @Output() onCellClick = new EventEmitter<void>()

  @Input() sideMenu: SidemenuComponent

  daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

  currentYear: number
  currentMonth: number
  currentDay: number
  values: number[][] = []
  currentDate = new Date()
  todayDate: number 
  todayMonth: number
  todayYear: number
  dataFromPopup: DataDto
  allDataFromPopup: DataDto[]
  count: number = 0

  constructor(
    private routes: Router,
    private dataService: HttpServiceService,
    private transferService: TransferService
    ) {
    const date = new Date()
    this.currentYear = date.getFullYear()
    this.currentMonth = date.getMonth()
    this.currentDay = date.getDate()
    this.todayYear = date.getFullYear()
    this.todayMonth = date.getMonth()
    this.todayDate = date.getDate()
    this.dataFromPopup = {
      year: 0,
      month: 0,
      day: 0,
      name: "",
      description: "",
      explanation: ""
    }
    this.allDataFromPopup = [{
      year: 0,
      month: 0,
      day: 0,
      name: "",
      description: "",
      explanation: ""
    }]
  }

  ngOnInit(): void {
    this.update()
    console.log('dssddfs');
    
    this.displayOneMonthData()
  }

  update(): void {
    const year = this.currentYear
    const month = this.currentMonth
    const firstDayOfMonthDate = new Date(year, month, 1)
    const firstDayOfMonth = firstDayOfMonthDate.getDay()
    const amountOfDaysInMonth = new Date(year, month + 1, 0).getDate()
    console.log(firstDayOfMonth, firstDayOfMonthDate, amountOfDaysInMonth)
  
    const values: number[] = []
    for (let i = 0; i < firstDayOfMonth - 1; i++) {
      values.push(0)
    }

    for (let i = 1; i <= amountOfDaysInMonth; i++) {
      values.push(i)
    }

    const chunkSize = 7
    const calendar = []
    for (let i = 0; i < values.length; i += chunkSize) {
      const chunk = values.slice(i, i + chunkSize)
      calendar.push(chunk)
    }

    const counter = calendar[calendar.length-1].length
    for (let i = 0; i < 7 - counter; i++) {
      calendar[calendar.length-1].push(0)
    }

    console.log(calendar)
    this.values = calendar
  }

  setNextMonth(): void {
    this.currentMonth += 1
    this.update()
    this.updateDate()
    this.displayOneMonthData()
  }

  setPreviousMonth(): void {
    this.currentMonth -= 1
    this.update()
    this.updateDate()
    this.displayOneMonthData()
  }
  
  private updateDate(): void {
    const date = new Date(this.currentYear, this.currentMonth, 1)
    this.currentDate = date
  }

  setDefaultMonth(): void {
    const date = new Date()
    this.currentYear = date.getFullYear()
    this.currentMonth = date.getMonth()
    this.update()
    this.updateDate()
    this.displayOneMonthData()
  }

  setDescription(year: number, month: number, day: number): void {
    this.routes.navigateByUrl(`deal/${year}-${month}-${day}`)
  }

  // getDescription($scope): void {

  // }

  // displayData(data: DataDto): void {
  //   this.dataFromPopup = data
  // }
  // displayData(id: string) {
  //   this.dataService.getDataById(id).subscribe(data => {
  //     this.dataFromPopup = data
  //     console.log(this.dataFromPopup)
  //   })
  // }

  // displayAllData() {
  //   this.dataService.getAllData()
  //   .pipe(map((data: DataDto[]) => data.filter(deal => deal.year == this.currentYear && deal.month == this.currentMonth)))
  //   .subscribe(_ => {
  //     this.allDataFromPopup = _
  //     console.log(this.allDataFromPopup)
      
  //   })
  // }

  displayOneMonthData() {
    this.dataService.getMonthData(this.currentYear.toString(), this.currentMonth.toString()).subscribe(_ => {
      this.allDataFromPopup = _
    })
  }

  cellClick(day: number) {
    var flag = true
    this.onCellClick.emit()
    this.displayOneMonthData()
    this.allDataFromPopup.forEach(data => {
      if (data.day == day) {
        const currentData = {
          year: this.currentYear,
          month: this.currentMonth,
          day,
          name: data.name,
          description: data.description,
          explanation: data.explanation
        }
        this.transferService.setData(currentData)
        flag = !flag
      }
    })
    if (flag) {
      const currentDate = {
        year: this.currentYear,
        month: this.currentMonth,
        day,
        name: '',
        description: '',
        explanation: ''
      }
      this.transferService.setData(currentDate)
    }
    

    // this.routes.navigate([], {
    //   queryParams: {
    //     current: `${day}.${this.currentMonth}.${this.currentYear}`
    //   } 
    // })
  }

  // updateSideMenu() {
  //   this.sideMenu.ngOnInit()
  // }

  increase() {
    this.count++
  }
  onNgInit() {
    this.ngOnInit()
  }
}
