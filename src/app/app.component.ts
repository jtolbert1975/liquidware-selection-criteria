import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/data.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'liquidware-app';
  yesterdayGrp$: any = [];
  constructor(private dataService: DataService){}

  ngOnInit(){
    console.log("ngOnInit")

    this.yesterdayGrp$ = this.dataService.getAllYesterday();

    this.yesterdayGrp$.subscribe((data: any) => {
      console.log("Yesterday: ", data)
    })

  }
}
