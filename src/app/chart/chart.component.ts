import {
  Component,
  Inject,
  NgZone,
  PLATFORM_ID,
  OnInit,
  Input,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() workLoadRankings: any = [];
  @Input() userList: any = [];
  chartData: any;
  isLoading: boolean = true;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    if (
      this.dataService.WorkLoadTable &&
      this.dataService.WorkLoadTable.length > 0
    ) {
      this.chartData = this.dataService.WorkLoadTable;
      this.chartData = this.formatChartData(this.chartData);
    } else {
      this.userList.subscribe((data: any) => {
        this.chartData = data;
        this.chartData = this.formatChartData(this.chartData);
      });
    }
  }

  ngAfterViewInit() {}

  formatChartData(chartData: any) {
    let tempTable: any[] = chartData.table;
    let userGrp: any = [];
    let formatGrp: any = [];

    userGrp = this.setUserGrp(chartData);

    for (let i = 0; i < userGrp.length; i++) {
      let j = 1;
      tempTable.forEach((tblItem: any) => {
        let tempGrp: any;
        // userGrp[i].score = tblItem.score;
        tempGrp = {
          name: tblItem.user_name,
          value: tblItem.score,
        };

        formatGrp.push(tempGrp);
        j++;
      });
    }

    this.isLoading = false;
    return formatGrp;
  }

  setUserGrp(chartData: any) {
    let userGroup: any = [];

    for (const [key, value] of Object.entries(chartData)) {
      if (key === 'inspector_name') {
        let temp: any = [];
        temp[key] = value;
        userGroup.push(temp);
      }
    }

    return userGroup;
  }

  onSelect(event: any) {
    let id = event.name;
    this.router.navigate(['details', id]);
  }
}
