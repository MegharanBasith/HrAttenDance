import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from 'primeng/api';
import { routes, UserRoleService } from 'src/app/core/core.index';
import { UserService } from 'src/app/core/services/user/user.service';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{
  public routes = routes;
  showSpinner : boolean = false;
  clientId !: string;
  columns = [
    'name',
    'email',
    'role',
    'isActive',
    'createdAt',
  ];
  displayedColumns = ['actions', ...this.columns]
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort!: MatSort;
  totalUsersCount : number = 0;

  constructor(private userservice: UserService, private messageService: MessageService){}

  ngOnInit(): void {
    let unParsedClientId = localStorage.getItem('clientId');
    if (unParsedClientId)
      this.clientId = unParsedClientId;  

    this.getUserList(environment.defaultPageStartIndex - 1, environment.defaultPageSize);
    }

    getUserList(startIndex: number, pageSize: number) {
      this.showSpinner = true;
  
      debugger;
      this.userservice.getuserList(this.clientId, startIndex, pageSize).subscribe(
        (response: any) => {
          debugger;
          this.showSpinner = false;
          if (response && response.isSuccess) {
            this.dataSource.data = response.data.userList;
            this.dataSource.sort = this.sort;
            debugger;
            this.totalUsersCount = response.data.totalCount;
          }
        },
        (error) => {
          this.showSpinner = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while retrieving user list" });
        }
      )
    }

    updateUserStatus(row: any) {
      this.showSpinner = true;
      let userStatus = row.isActive === true ? 0 : 1;
      this.userservice.updateUserStatus(row.userId, userStatus).subscribe(
        (response: any) => {
          debugger;
          this.showSpinner = false;
          if (response && response.isSuccess) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.message ?? "User status updated successfully" });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
          else if (response && !response.success)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while updating user status successflly" });
        },
        (error) => {
          this.showSpinner = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while updating user status successflly" });
        }
      )
    }

    editUser(row:any){}

    setPage(event: any) {
      debugger;
      this.getUserList((event.pageIndex * event.pageSize), event.pageSize)
    }

    public sortData(sort: Sort) {
      const data = this.dataSource.data.slice();
  
      /* eslint-disable @typescript-eslint/no-explicit-any */
      if (!sort.active || sort.direction === '') {
        this.dataSource.data = data;
      } else {
        this.dataSource.data = data.sort((a: any, b: any) => {
          const aValue = (a as any)[sort.active];
          const bValue = (b as any)[sort.active];
          return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
        });
      }
    }
}
