import { Component, OnInit } from '@angular/core';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { process,State } from '@progress/kendo-data-query';
import { Data } from '../model/user.module';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public gridUserData: Data[] = JSON.parse(localStorage.getItem('userData')!);
  public state: State = {
    skip: 0,
    take: 5,
    sort: [],
    group: [],
    filter: {
      logic: "and",
      filters: [],
    },
  };
  public gridData: GridDataResult = process(this.gridUserData, this.state);

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.gridUserData, this.state);
  }

  public clearForm(): void {
    //this.form.reset();
  }

  public updateForm(): void {
    //this.form.reset();
  }

  public deleteForm(): void {
    //this.form.reset();
  }


}
