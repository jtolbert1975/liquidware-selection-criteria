import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-hourly-details',
  templateUrl: './hourly-details.component.html',
  styleUrls: ['./hourly-details.component.scss'],
})
export class HourlyDetailsComponent implements OnInit {
  id: any = '';
  user$: any = [];
  workLoadRankings$: any = [];
  array: any;
  dataSource: any = [];
  displayColumns: any[] = [
    'end_date',
    'user_name',
    'user_id',
    'score',
    'record_count',
    'cpu_used_percent',
    'memory_used_percent',
    'page_used_percent',
    'total_io_bps',
    'total_iops',
    'net_total_bps',
    'cpu_context_switching_avg',
    'swap_page_faults',
    'page_faults',
    'node_count',
    'user_count',
    'cid_seconds',
  ];
  showAll: boolean = false;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  isLoading: boolean = true;
  pageSize = 10;
  currentPage = 0;
  totalSize = 0;
  pageEvent: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(
    private _Activatedroute: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get('id');

    this.user$ = this.dataService.getYesterdayByUser(this.id);
    this.workLoadRankings$ = this.dataService.WorkLoadTable;

    this.user$.subscribe((data: any) => {
      this.array = data.table;
      this.totalSize = this.array.length;
      this.iterator();
    });
  }

  private iterator() {
    this.array.sort(function (a: any, b: any) {
      return a.score - b.score;
    });
    this.array.reverse();
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = new MatTableDataSource<Element>(part);
    this.dataSource = this.mergeData(this.dataSource);
    this.dataService.getLatestValue(this.dataSource.data);

    this.isLoading = false;
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  navigateToHome() {
    this.router.navigate(['home']);
  }

  mergeData(dataSource: any) {
    let newList: any = [];

    dataSource.data.forEach((element: any) => {
      for (let i = 0; i < this.workLoadRankings$.length; i++) {
        if (element.user_name === this.workLoadRankings$[i].user_name) {
          let endDate = element.end_date;
          element = { ...this.workLoadRankings$[i] };
          element.end_date = endDate;
          newList.push(element);
        }
      }
    });

    return newList;
  }
}
