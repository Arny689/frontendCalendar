import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { TransferService } from '../services/transfer.service';
import { DataDto, DateParsed } from '../services/data.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, firstValueFrom, from } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit, OnDestroy {

  // currentMonthData: DataDto[] | undefined
  // currentDay: number | undefined
  date$: Observable<DateParsed | null>
  data$: Observable<DataDto | null>
  date: DateParsed
  data: DataDto
  popup: boolean

  private dataSubscription: Subscription | null = null 

  private dateSubscription: Subscription | null = null 

  @Output() sidemenuClose: EventEmitter<void> = new EventEmitter<void>()

  constructor(
    private transferService: TransferService,
    private routes: Router,
    private activatedRoute: ActivatedRoute,
    private httpService: HttpServiceService
  ) {
      this.dataSubscription = this.transferService.data$.subscribe(currentData => { 
        if (!currentData) return;
        this.data = currentData
        console.log
      }),
      this.dateSubscription = this.transferService.date$.subscribe(currentDate => {
        if (!currentDate) return;
        this.date = currentDate
        console.log
      }),
      this.popup = false
  }

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    explanation: new FormControl('', [
      Validators.required
    ])
  })

  get getFormControls() {
    return this.form.controls
  }

  ngOnInit(): void {
    console.error("akakakakakk");
    
    // this.getInfo()
    // this.activatedRoute.queryParams.subscribe(_ => console.log(_))
  }

  ngOnDestroy(): void {
    console.warn("akakakakkaka");
    this.dataSubscription?.unsubscribe()
    this.dateSubscription?.unsubscribe()
  }

  // getInfo() {
  //   this.currentMonthData = this.transferService.getData()
  //   this.currentDay = this.transferService.getDay()
  // }

  popupOn() {
    this.popup = true
  }

  popupOff() {
    this.popup = false
  }

  // layoutOff(event: Event) {
  //   // if (event.target.classList.contains('popup-layout')) {
  //   //   this.popup = false
  //   // }
  //   this.popup = false
  // } 

  formClick(event: Event) {
    event.stopPropagation()
  }

  async sendData() {
    if (!(this.form.value.name && this.form.value.description && this.form.value.explanation)) return;
    const currentData = {
      year: this.data.year,
      month: this.data.month,
      day: this.data.day,
      name: this.form.value.name,
      description: this.form.value.description,
      explanation: this.form.value.explanation
    }
    const currentValues = await firstValueFrom(this.httpService.createData(currentData))
    console.log(this.transferService.data$.value)
    this.transferService.data$.next(currentValues)
    this.popupOff()
  }

  sidemenuOff() {
    this.sidemenuClose.emit()
  }

}
