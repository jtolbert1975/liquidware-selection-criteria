import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { WorkLoadRankings } from '../workload-rankings.model';
import { MatSort, Sort } from '@angular/material/sort';
import { DataService } from 'src/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() workLoadRankings: any;
  @Input() userList: any = [];
  array: any;
  columnNames: string[] = [];
  dataSource: any = [];
  displayColumns: WorkLoadRankings[] = [];
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

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    this.userList.subscribe((data: any) => {
      this.columnNames = this.setColumns(data.xref);

      this.array = data.table;
      this.dataService.getLatestValue(this.array);
      this.totalSize = this.array.length;
      this.iterator();
    });
  }

  setColumns(columnObj: any) {
    let columns: any = [];
    let displayCol: any = [];
    let wantedCols: any = [
      'score',
      'user_name',
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

    let filteredList: any = [];
    for (const item in columnObj) {
      columns.push(`${columnObj[item]}`);
      displayCol.push(item);
    }

    displayCol.forEach((element: any) => {
      if (wantedCols.hasOwnProperty(element)) {
        filteredList.push(element);
      }
    });
    this.displayColumns = wantedCols;
    return columns;
  }

  setShowAll() {
    this.showAll = !this.showAll ? true : false;
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
    this.dataSource.sort = this.sort;

    this.isLoading = false;
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  goToDetials(id: string) {
    this.router.navigate(['details', id]);
  }
}
