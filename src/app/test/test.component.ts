import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent implements OnInit {

  word: string = 'alla'

  data = {
    name: 'Andrey',
    age: 22
  }

  mydata = [{name: 'a'}, {name: 'b'}]

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    let count = 0
    const interval = setInterval(() => {
      this.data = {...this.data, age: this.data.age + 1}
      console.log(this.data)
      count++
      if (count >= 10) clearInterval(interval)
    }, 1000)
    
  }

  public changeAge() {
    this.data.age = this.data.age + 1
    this.cdr.detectChanges()
  }

  public changeWord() {
    this.word = this.word + '!'
  }

  public changeData() {
    this.mydata.push({name: 'c'})
    console.log(this.mydata)
  }



}
