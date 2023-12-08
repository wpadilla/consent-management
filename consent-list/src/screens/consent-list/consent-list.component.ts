import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UserEntity} from "../../shared/entities/UserEntity";
import {WindowEvents} from "../../shared/constants/windowEvents.constants";

@Component({
  selector: 'app-consent-list',
  templateUrl: './consent-list.component.html',
  styleUrls: ['./consent-list.component.scss']
})
export class ConsentListComponent implements OnInit, OnDestroy {
  title = 'consent-list';
  displayedColumns: (keyof UserEntity)[] = ['name', 'email', 'consents'];
  dataSource =  new MatTableDataSource<UserEntity>([])
  userService: any;

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  async ngOnInit() {
    window.addEventListener(WindowEvents.usersLoaded,
      ({detail: users}: any) => {
      this.setTableData(users);
    });

    this.loadServices();
  }

  async loadServices() {
    const data = await import("services/Load" as any);
    if(data.default.users) {
      this.userService = new data.default.users();
      this.loadData();
    }
  }
  async loadData() {
    const data = await this.userService.get();
    this.setTableData(data);
  }

  setTableData(users: UserEntity[]) {
    this.dataSource = new MatTableDataSource<UserEntity>(users);
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    window.removeEventListener(WindowEvents.usersLoaded, () => {});
  }

}
