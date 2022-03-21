import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url: string = 'https://demo.liquidware.com/lwl/api?json=';
  url2: string =
    'https://demo.liquidware.com/lwl/api?json={"inspector":"0", "basis": "users"}';
  userUrl: string = 'https://demo.liquidware.com/lwl/api?';
  testUserUrl =
    'https://demo.liquidware.com/lwl/api?json={"inspector:"0,"basis:"users,"date:"yesterday,"user_name:"adm51195}';
  workLoadList: any = [];
  content: any = new BehaviorSubject<any>(this.workLoadList);
  share = this.content.asObservable();
  WorkLoadTable: any = [];

  constructor(private http: HttpClient) {}

  getAllYesterday(): Observable<any> {
    let inspector = 0;
    let basis = 'users';
    let date = 'hourly';
    let columns = {
      columns:
        'record_count,cpu_used_mhz,rank_score,memory_used_mb,page_u sed_mb,total_io_bps,total_iops,net_total_bps,cpu_context_switching_avg,swa p_page_faults,page_faults,node_count,user_count,cid_seconds',
      sort_col: 'rank_score',
      sort_order: '2',
    };
    let paramObj = {
      inspector: inspector,
      basis: basis,
      date: date,
      columns: columns,
    };
    return this.http.get(this.url + JSON.stringify(paramObj)).pipe();
  }

  getAllUsersYeterday() {
    let inspector = 0;
    let basis = 'users';
    let date = 'yesterday';
    let columns = {
      columns:
        'record_count,cpu_used_mhz,rank_score,memory_used_mb,page_u sed_mb,total_io_bps,total_iops,net_total_bps,cpu_context_switching_avg,swa p_page_faults,page_faults,node_count,user_count,cid_seconds',
      sort_col: 'rank_score',
      sort_order: '2',
    };
    let paramObj = {
      inspector: inspector,
      basis: basis,
      date: date,
      columns: columns,
    };
    return this.http.get(this.url2).pipe();
  }

  getYesterdayByUser(name: string) {
    let inspector = 0;
    let basis = 'users';
    let date = 'yesterday';
    let resolution = 'hourly';
    let username = name;
    let columns = {
      columns:
        'record_count,cpu_used_mhz,rank_score,memory_used_mb,page_u sed_mb,total_io_bps,total_iops,net_total_bps,cpu_context_switching_avg,swa p_page_faults,page_faults,node_count,user_count,cid_seconds',
      sort_col: 'rank_score',
      sort_order: '2',
    };
    let paramObj = {
      inspector: inspector,
      basis: basis,
      date: date,
      resolution: resolution,
      username: username,
      columns: columns,
    };

    let url = this.userUrl + 'json=' + JSON.stringify(paramObj);

    const params = new HttpParams()
      .set('inspector', inspector)
      .set('basis', basis)
      .set('date', date)
      .set('user_name', username);

    return this.http.get<any[]>(url).pipe();
  }

  getLatestValue(data: any) {
    this.content.next(data);
    this.WorkLoadTable = data;
  }
}
