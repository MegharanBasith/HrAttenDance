import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EmployeeContractService, routes, UserRoleService } from 'src/app/core/core.index';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-employee-contract-list',
  templateUrl: './employee-contract-list.component.html',
  styleUrl: './employee-contract-list.component.scss'
})
export class EmployeeContractListComponent implements OnInit {
  public routes = routes;
  showSpinner = false;
  projectId !: string;
  @ViewChild(MatSort) contractSort!: MatSort;
  @ViewChild(MatSort) allowanceSort!: MatSort;
  contractColumns = [
    'contractNum',
    'version',
    'empNum',
    'name',
    'startDate',
    'endDate',
    'basicSalary',
    'effectiveDate',
    'status',
    'transDate',
    'workflowState',
    'totalPackageAmount',
    'ticketClass',
    'destinationId',
    'vacationEnDesc'
  ];
  displayedContractColumns: string[] = ['actions', ...this.contractColumns];
  employeeContractDataSource = new MatTableDataSource<any>();
  allowanceDataSource = new MatTableDataSource<any>();
  totalContractCount = 0;
  showAllowanceModal: boolean = false;
  selectedContractId !: string;
  activeStatus = "Active";
  isAdmin = false;

  constructor(private employeeContractService: EmployeeContractService, private router: Router, private messageService: MessageService, private userRoleService: UserRoleService) { }

  ngOnInit(): void {
    let unparsedProjectId = localStorage.getItem('projectId');
    if (unparsedProjectId)
      this.projectId = unparsedProjectId;

    this.getEmployeeContractList(environment.defaultPageStartIndex, environment.defaultPageSize);
    this.isAdmin = this.userRoleService.isAdmin();
  }

  getEmployeeContractList(startIndex: number, pageSize: number) {
    this.showSpinner = true;

    debugger;
    this.employeeContractService.getEmployeeContractList(this.projectId, startIndex, pageSize).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.employeeContractDataSource.data = response.data.employeeContractList;
          this.employeeContractDataSource.sort = this.contractSort;
          this.totalContractCount = response.data.totalRecordsCount;
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while retrieving contracts" });
      }
    )
  }

  updateEmployeeContract(contractId: string) {
    this.showSpinner = true;

    debugger;
    this.employeeContractService.updateEmployeeContract(contractId).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess)
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "Contract updated successfully" });

        else
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while updating the contract" });
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while updating the contract" });
      }
    )
  }

  suspendEmployeeContract(contractId: string) {
    this.showSpinner = true;

    debugger;
    this.employeeContractService.suspendEmployeeContract(contractId).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "Contract suspended successfully" });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }

        else
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while suspending the contract" });
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while suspending the contract" });
      }
    )
  }

  reativateEmployeeContract(contractId: string) {
    this.showSpinner = true;

    debugger;
    this.employeeContractService.reactivateEmployeeContract(contractId).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "Contract reactivated successfully" });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }

        else
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while reactivating the contract" });
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while reactivating the contract" });
      }
    )
  }
  
  onEdit(contract : any){
    localStorage.setItem('selectedContract', JSON.stringify(contract));
    this.router.navigate([routes.employeeContractEdit]);
  }
  
  setPage(event: any) {
    this.getEmployeeContractList((event.pageIndex * event.pageSize) + 1, event.pageSize)
  }

  public sortData(sort: Sort, dataSource: MatTableDataSource<any>) {
    const data = dataSource.data.slice();

    if (!sort.active || sort.direction === '') {
      dataSource.data = data;
    } else {
      dataSource.data = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
}
