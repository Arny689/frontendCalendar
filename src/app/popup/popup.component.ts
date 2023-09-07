import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from '../services/http-service.service';
import { DataDto } from '../services/data.dto';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {

  constructor(
    private routes: Router,
    private dataService: HttpServiceService
  ) {}
  
  @Output() dataEvent = new EventEmitter<DataDto>()

  dealData: DataDto = {
    year: 0,
    month: 0,
    day: 0,
    name: "",
    description: "",
    explanation: ""
  }

  form = new FormGroup({

    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(12)
    ]),

    description: new FormControl('Nothing interesting'),

    explanation: new FormControl('Nothing interesting')
  })

  get allForms() {
    return this.form.controls
  }

  createData() {
    
    const path = this.routes.url.split('/')[2].split('-')

    const values = {
      year: Number(path[0]),
      month: Number(path[1]),
      day: Number(path[2]),
      name: this.form.value.name!,
      description: this.form.value.description!,
      explanation: this.form.value.explanation!
    }
    console.log('1')
    
    this.dataService.createData(values).subscribe(data => {
      this.dealData = data
      console.log(this.dealData)
      this.dataEvent.emit(this.dealData)
      this.toCalendar()
    })
    console.log('2')
    
  }

  toCalendar() {
    this.routes.navigateByUrl('') 
  }
}
