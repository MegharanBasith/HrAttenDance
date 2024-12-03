import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from 'primeng/api';
import { PaymentOrderService, routes, UserRoleService } from 'src/app/core/core.index';
import { PaymentOrderLine } from 'src/app/core/models/payment-order/delete-paymet-order-line';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-payment-order-lines',
  templateUrl: './payment-order-lines.component.html',
  styleUrl: './payment-order-lines.component.scss'
})
export class PaymentOrderLinesComponent implements OnInit {

  public routes = routes;
  public showSpinner: boolean = false;
  dataSource = new MatTableDataSource<any>([]);
  paymentOrderLineList: any[] = [];
  columns: string[] = [
    "hasErrors",
    "faield",
    "paid",
    "settled",
    "iqamaNumber",
    "borderNumber",
    "accountNumber",
    "iban",
    "empId",
    "empName",
    "amount",
    "gosiSalary",
    "basicSalary",
    "housingAllowance",
    "otherEarning",
    "otherDeadAction",
    "errorMsg"
  ];
  displayedColumns: string[] = ['select', ...this.columns];
  selectedRecId !: number;
  public totalPaymentOrderLines: number = 0;
  isAdmin: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  paymentOrderLineSelection = new SelectionModel<any>(true, []);
  selectedPaymentOrder !: any;
  approvedWorkflowState = 4;

  constructor(private paymentOrderService: PaymentOrderService, private messageService: MessageService, private userRoleService: UserRoleService) { }

  ngOnInit(): void {
    this.isAdmin = this.userRoleService.isAdmin();
    let notParsedRecId = localStorage.getItem('selectedRecId');
    if (notParsedRecId)
      this.selectedRecId = JSON.parse(notParsedRecId);
    this.getPaymentOrderLines(environment.defaultPageStartIndex, environment.defaultPageSize);
    let notparsedPaymentOrder = localStorage.getItem('selectedPaymentOrder');
    if (notparsedPaymentOrder)
      this.selectedPaymentOrder = JSON.parse(notparsedPaymentOrder);
  }

  setPage(event: any) {
    this.getPaymentOrderLines((event.pageIndex * event.pageSize) + 1, event.pageSize)
  }

  getPaymentOrderLines(startIndex: number, pageSize: number) {
    debugger;
    this.showSpinner = true;
    this.paymentOrderService.getPaymentOrderLineList(this.selectedRecId, startIndex, pageSize).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.paymentOrderLineList = response.data.paymentOrderList;
          this.dataSource.data = response.data.paymentOrderList;
          this.dataSource.sort = this.sort;
          this.totalPaymentOrderLines = response.data.totalRecordsCount;
        }
      },
      (error) => {
        this.showSpinner = false;
        console.error(error);
      }
    )
  }

  deletePaymentOrderLines() {
    debugger;
    this.showSpinner = true;
    let paymentOrderLineList: PaymentOrderLine[] = this.paymentOrderLineSelection.selected.map(x => ({
      RecId: x.recId
    }));
    this.paymentOrderService.deletePaymentOrderLines(this.selectedPaymentOrder.paymentOrderID, paymentOrderLineList).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.dataSource.data = this.dataSource.data.filter(
            (item: any) => !paymentOrderLineList.some((line: any) => line.RecId === item.recId));
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.return ?? "Payment order lines deleted successfully" });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occurred while deleting payment order lines" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        console.error(error);
      }
    )
  }

  submitPaymentOrder() {
    debugger;
    this.showSpinner = true;
    this.paymentOrderService.submitPaymentOrder(this.selectedPaymentOrder.paymentOrderID).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          if (response.data)
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.return ?? "Payment order submitted successfully" });
          else
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occurred while submiting payment order" });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occurred while submitting payment order" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        console.error(error);
      }
    )
  }

  setPaymentOrderLinesPaid() {
    debugger;
    this.showSpinner = true;

    let model = this.constructUpdatePaymentOrderLineStatus();

    this.paymentOrderService.setPaymentOrderLinePaid(model).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.return ?? "Payment order lines marked paid successfully" });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occurred while marking payment order lines as paid" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "An error has occurred while marking payment order lines as paid" });
        console.error(error);
      }
    )
  }

  setPaymentOrderLinesFailed() {
    debugger;
    this.showSpinner = true;
    let model = this.constructUpdatePaymentOrderLineStatus();
    this.paymentOrderService.setPaymentOrderLineFailed(model).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.return ?? "Payment order lines marked failed successfully" });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occurred while marking payment order lines as failed" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "An error has occurred while marking payment order lines as failed" });
        console.error(error);
      }
    )
  }

  private constructUpdatePaymentOrderLineStatus() {
    debugger;
    let isAllSelected: boolean = this.paymentOrderLineSelection.selected.length === this.dataSource.data.length;
    let paymentOrderLineList: PaymentOrderLine[] = this.paymentOrderLineSelection.selected.map(x => ({
      RecId: x.recId
    }));
    let model = {
      "PaymentOrderLinesList": isAllSelected ? [] : paymentOrderLineList,
      "AllEmp": isAllSelected ? "Yes" : "No",
      "PaymentOrderRecID": isAllSelected ? this.selectedRecId : ""
    };
    return model;
  }

  settlePaymentOrderLines() {
    debugger;
    this.showSpinner = true;
    this.paymentOrderService.settlePaymentOrderLines(this.selectedPaymentOrder.paymentOrderID).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.return ?? "Payment order lines settled successfully" });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occurred while settling payment order lines" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "An error has occurred while settling payment order lines" });
        console.error(error);
      }
    )
  }


  // approveSalaryCalculation(){
  //   this.showSpinner = true;
  //   let payGroupId = "BR0000007";
  //   this.salaryCalculationService.ApproveSalaryCalculation(payGroupId).subscribe(
  //     (response: any) => {
  //       debugger;
  //       this.showSpinner = false;
  //       if (response && response.isSuccess) {
  //         this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message ?? "Salary calculation created successfully" });
  //       }
  //       else{
  //         this.messageService.add({ severity: 'danger', summary: 'Error', detail: response?.message ?? "An error has occured while creating salary calculation" });
  //       }
  //     },
  //     (error) => {
  //       this.showSpinner = false;
  //       this.messageService.add({ severity: 'danger', summary: 'Error', detail: error.message });
  //       console.error(error);
  //     }
  //   )
  // }

  public sortData(sort: Sort) {
    const data = this.paymentOrderLineList.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.paymentOrderLineList = data;
    } else {
      this.paymentOrderLineList = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  isAllSelected(dataSource: MatTableDataSource<any>, selection: SelectionModel<any>) {
    const numSelected = selection.selected.length;
    const numRows = dataSource.data.length;
    return numSelected === numRows;
  }

  canMarkPaidOrFailed(){
    // if(this.paymentOrderLineSelection.selected.some(x=> x.paid === 1) || this.paymentOrderLineSelection.selected.some(x=> x.faield === 1))
    //   return false;
    if(this.paymentOrderLineSelection.selected.every(x=>x.settled === 0) /*&& (this.paymentOrderLineSelection.selected.some(x=>x.paid === 0))*/)
      return true;
    return false;
  }

  masterToggle(dataSource: MatTableDataSource<any>, selection: SelectionModel<any>) {
    debugger;
    this.isAllSelected(dataSource, selection)
      ? selection.clear()
      : dataSource.data.forEach(row => selection.select(row));
  }

  canSettle(){
    var canSetPaidOrFailed = this.dataSource.data.some(x=>x.paid === 0) && this.dataSource.data.some(x=>x.faield === 0);
    if(this.dataSource.data.every(x=>x.settled === 0) && !canSetPaidOrFailed)
      return true;
    return false;
  }
}

