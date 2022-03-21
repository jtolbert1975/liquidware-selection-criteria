import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  yesterdayGrp$: any = [];
  usersYesterday$: any = [];
  showChart: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}
  fetchData() {
    this.yesterdayGrp$ = this.dataService.getAllYesterday();
    this.usersYesterday$ = this.dataService.getAllUsersYeterday();
    this.showChart = true;
  }
}
