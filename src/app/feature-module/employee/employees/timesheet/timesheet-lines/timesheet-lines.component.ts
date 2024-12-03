import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, TimesheetService, UserRoleService, apiResultFormat, getTimeSheet, routes } from 'src/app/core/core.index';
import { GenerateTimesheetRequestModel } from 'src/app/core/models/timesheet/generate-timesheet-request-model';
import { saveAs } from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { TimesheetLineModel } from 'src/app/core/models/timesheet/timesheet-line-model';
import { TimesheetLineContractModel } from 'src/app/core/models/timesheet/timesheet-line-contract-model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-timesheet-lines',
  templateUrl: './timesheet-lines.component.html',
  styleUrl: './timesheet-lines.component.scss'
})
export class TimesheetLinesComponent implements OnInit {
  displayedColumns: string[] = [
    'absenceDays',
    'contractID',
    'customerLoan',
    'deductionAmount',
    'deservedMonthlyFees',
    'employeeOtherDeductions',
    'employeeOtherDues',
    'gOSI',
    'invoiced',
    'invoicingItemId',
    'lineNum',
    'mawaridOtherDeductions',
    'mawaridOtherDues',
    'monthlyFees',
    'mwaridays',
    'nationalityId',
    'netSalary',
    'netSalaryCustomer',
    'note',
    'personnelNumber',
    'professionId',
    'projId',
    'recId',
    'salaryProcessed',
    'salaryProcessed1',
    'timeSheetPeriod',
    'timeSheetStatus',
    'timeSheetTableRefRecid',
    'totalInvoiceSalary',
    'totalSalary',
    'workerName',
    'workingDaysCustomer',
    'workingDaysPayroll',
  ];
  displayedColumnsWithActions: string[] = ['select', 'actions', ...this.displayedColumns];
  fields: string[] = [
    'lineNumber',
    'netSalary',
    'netSalaryCustomer',
    'employeeOtherDues',
    'employeeOtherDeductions',
    'mawaridOtherDues',
    'mawaridOtherDeductions',
    'deductionAmount',
    'deductionReason',
    'gOSI',
    'customerLoan',
    'absenceDays',
    'mawaridDays',
    'workingDaysPayroll',
    'workingDaysCustomer'
  ];
  formGroups: { [key: string]: FormGroup } = {};
  fieldMappings: { [key: string]: string } = {};
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public lstTimesheet: Array<getTimeSheet> = [];
  public searchDataValue = '';
  //dataSource!: MatTableDataSource<getTimeSheet>;
  public routes = routes;
  // pagination variables
  public lastIndex = 0;
  public StartIndex = 1;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  public timesheetLines: Array<any> = [];
  showSpinner: boolean = false;
  timesheetTableRefRecId !: string;
  length: number = 0;
  importFileBase64String !: string;
  @ViewChild('columnMappingDialog') columnMappingDialog!: TemplateRef<any>;
  excelHeaders: string[] = ['Header1', 'Header2', 'Header3']; // replace with dynamic data
  availableLabels: string[] = ['Label1', 'Label2', 'Label3']; // replace with dynamic labels
  selectedMappings: string[] = [];
  showSidebar: boolean = false;
  newTimesheetLines: TimesheetLineModel[] = [];
  dynamicImportedFile !: File;
  timesheetLinesRecordCount: number = 0;
  totalTimesheetLines: number = 0;
  isLineNumberSelected: boolean = false;
  defaultTimeSheetLinesBatchCount: number = 100;
  validSubmitCounter: number = 0;
  selectedTimesheet!: any;
  timesheetDetails !: any;
  selectedRow !: any;
  isAdmin: boolean = false;
  timesheetLinesSelection = new SelectionModel<any>(true, []);
  projectId !: string;
  @ViewChild('templateFileInput') templateFileInput!: HTMLInputElement;
  @ViewChild('dynamicFileInput') dynamicFileInput!: HTMLInputElement;

  //** / pagination variables

  constructor(private data: DataService, private timesheetService: TimesheetService,
    public dialog: MatDialog, private fb: FormBuilder, private userRoleService: UserRoleService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    debugger;
    let unparsedProjectId = localStorage.getItem('projectId');
    if (unparsedProjectId)
      this.projectId = unparsedProjectId;

    let unParsedSelectedTimesheet = localStorage.getItem('selectedTimesheet');
    if (unParsedSelectedTimesheet)
      this.selectedTimesheet = JSON.parse(unParsedSelectedTimesheet);

    this.isAdmin = this.userRoleService.isAdmin();

    this.getTimesheetDetails();
    this.getTimesheetLines(1, 10);

    this.dataSource.data.forEach((row, index) => {
      this.formGroups[index] = this.fb.group({});
      this.displayedColumns.forEach(col => {
        this.formGroups[index].addControl(col, this.fb.control(row[col]));
      });
    });
  }

  onClose(): void {
    this.dialog.closeAll();
  }

  onSave(): void {
    //
    this.dialog.closeAll();
  }

  dynamicImport() {
    this.showSidebar = true;
  }

  saveRow(index: number) {
    const formValue = this.formGroups[index].value;
    this.dataSource.data[index] = { ...this.dataSource.data[index], ...formValue };
    this.dataSource.data = [...this.dataSource.data]; // Refresh data source
  }

  onRowEditInit(timesheetLine: any) {
    //this.clonedProducts[product.id as string] = { ...product };
  }

  onRowEditSave(timesheetLine: any) {
    this.saveTimesheetLines();
  }

  onRowEditCancel(product: any, index: number) {
    // this.products[index] = this.clonedProducts[product.id as string];
    // delete this.clonedProducts[product.id as string];
  }

  /*openDialog(): void {
    const dialogRef = this.dialog.open(this.columnMappingDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Mapping:', result);
        // Handle the mapping result here
      }
    });
  }*/
  /*ngAfterViewInit() {
    debugger;
    this.dataSource.paginator = this.paginator;
    this.showSpinner = true;
    this.paginator.page.subscribe(() => {
      this.timesheetService.getTimesheetLines('5637504579', (this.paginator.pageSize * this.paginator.pageIndex) + 1, this.paginator.pageSize).subscribe(
        (response: any) => {
          this.showSpinner = false;
          debugger;
          if (response && response.isSuccess) {
            this.timesheetLines = response.data;
            this.dataSource.data = response.data;
            this.length = 82;
          }
    });
  })
}*/

  setPage(event: any) {
    this.getTimesheetLines((event.pageIndex * event.pageSize) + 1, event.pageSize)
  }


  getTimesheetLines(startIndex: number, pageSize: number) {
    this.showSpinner = true;
    this.timesheetService.getTimesheetLines(this.selectedTimesheet.recId, startIndex, pageSize).subscribe(
      (response: any) => {
        this.showSpinner = false;
        debugger;
        if (response && response.isSuccess) {
          this.timesheetLines = response.data.timeSheetLines;
          this.dataSource.data = this.timesheetLines;
          this.timesheetLinesRecordCount = response.data.totalRecordsCount;
          this.dataSource.sort = this.sort;
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occurred while retrieving timesheet lines" });
      }
    )
  }

  getTimesheetDetails() {
    this.showSpinner = true;
    this.timesheetService.getTimesheetDetails(this.selectedTimesheet.timesheetId).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.timesheetDetails = response.data;
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occurred while retrieving timesheet details" });
      }
    )
  }

  private getTableData(): void {
    this.lstTimesheet = [];
    this.serialNumberArray = [];

    this.data.getTimeSheet().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: getTimeSheet, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.lstTimesheet.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<getTimeSheet>(this.lstTimesheet);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });


  }

  public sortData(sort: Sort) {
    const data = this.lstTimesheet.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.lstTimesheet = data;
    } else {
      this.lstTimesheet = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.lstTimesheet = this.dataSource.filteredData;
  }

  public getMoreData(event: string): void {
    if (event === 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    } else if (event === 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableData();
  }

  public changePageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 !== 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    for (let i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }

  getProformaInvoice() {
    this.showSpinner = true;
    this.timesheetService.getProformaInvoice(this.selectedTimesheet.timesheetId).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.convertBase64ToPdf(response.data, this.selectedTimesheet.timesheetId);
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "An error has occurred while retrieving the proforma invoice document" });
      }
    )
  }
  exportTimesheet() {
    this.showSpinner = true;
    this.timesheetService.exportTimesheet(this.selectedTimesheet.recId).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.convertBase64ToExcel(response.data);
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "An error has occurred while exporting the timesheet" });
      }
    )
  }

  submitTimesheet() {
    this.showSpinner = true;
    this.timesheetService.submitTimesheet(this.selectedTimesheet.timesheetId).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.return ?? "Timesheet submitted successfully" });
          setTimeout(() => {
            this.router.navigate([this.routes.timesheet]);
          }, 2000);
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: error.message ?? "An error has occurred while submitting the timesheet" });
      }
    )
  }

  private convertBase64ToPdf(base64String: string, fileName: string): void {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: 'application/pdf' });
    saveAs(blob, fileName || 'document.pdf');
  }
  async onFileSelected(event: any) {
    debugger;
    const file: File = event.target.files[0];
    if (file) {
      let base64String = await this.convertToBase64(file);
      if (base64String) {
        const pureBase64String = base64String.split(',')[1];
        this.importTimesheet(pureBase64String);
      }
    }
  }

  onDynamicFileSelected(event: any) {
    debugger;
    const file: File = event.target.files[0];
    if (file) {
      this.dynamicImportedFile = file;
      this.readExcelHeaders(file);
    }
  }

  private importTimesheet(base64String: string) {
    this.showSpinner = true;
    this.timesheetService.importTimesheet(base64String).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.return ?? "Timesheet imported successfully" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "An error has occurred while importing the timesheet" });
      }
    )
    this.templateFileInput.value = '';
  }
  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onerror = (error) => {
        console.log('Error: ', error);
        reject(error);
      };
    });
  }

  onSubmit() {
    debugger;
    this.showSpinner = true;
    const file = this.dynamicImportedFile;
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const data = new Uint8Array(fileReader.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const rows: any = XLSX.utils.sheet_to_json(worksheet);
      this.totalTimesheetLines = rows.length;
      for (let row of rows) {
        /*const payroll = this.timesheetLines.find((x: any) => x.LineNum === row[this.fieldMappings['LineNumber']]);
        if (payroll === null || payroll === undefined) {
          hasError = true;
          this.showSpinner = false;
          break;
        } else {*/
        const timesheetLine: TimesheetLineModel = {
          NetSalary: row[this.fieldMappings['netSalary']],
          NetSalaryCustomer: row[this.fieldMappings['netSalaryCustomer']],
          EmployeeOtherDues: row[this.fieldMappings['employeeOtherDues']],
          EmployeeOtherDeductions: row[this.fieldMappings['employeeOtherDeductions']],
          MawaridOtherDues: row[this.fieldMappings['mawaridOtherDues']],
          MawaridOtherDeductions: row[this.fieldMappings['mawaridOtherDeductions']],
          DeductionAmount: row[this.fieldMappings['deductionAmount']],
          DeductionReason: row[this.fieldMappings['deductionReason']],
          GOSI: row[this.fieldMappings['gOSI']],
          CustomerLoan: row[this.fieldMappings['customerLoan']],
          OvertimeAmount: row[this.fieldMappings['overtimeAmount']],
          OvertimeHours: row[this.fieldMappings['overtimeHours']],
          AbsenceDays: row[this.fieldMappings['absenceDays']],
          WorkingDaysPayroll: row[this.fieldMappings['workingDaysPayroll']],
          WorkingDaysCustomer: row[this.fieldMappings['workingDaysCustomer']],
          Mwaridays: row[this.fieldMappings['mawaridDays']],
          LineNum: row[this.fieldMappings['lineNumber']],
        };
        this.newTimesheetLines.push(timesheetLine);
        //}
      }
      this.saveTimesheetLines();
    };
    fileReader.readAsArrayBuffer(file);
  }

  saveTimesheetLines() {
    debugger;
    this.showSpinner = true;
    for (let i = 0; i < this.newTimesheetLines.length; i += this.defaultTimeSheetLinesBatchCount) {
      const timesheetLineContracrBatch: TimesheetLineContractModel = {
        ProjId: this.projectId,
        TimesheetPeriod: this.selectedTimesheet.timesheetPeriod,
        TimesheetLinesList: this.newTimesheetLines.slice(i, i + this.defaultTimeSheetLinesBatchCount)
      };
      this.timesheetService.saveTimesheetLines(timesheetLineContracrBatch).subscribe(
        (response: any) => {
          this.showSpinner = false;
          if (response && response.isSuccess) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "timesheet imported successfully" });
            this.showSidebar = false;
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        },
        (error) => {
          this.showSpinner = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occurred while saving timesheet lines" });
        }
      )
    }
    this.showSpinner = false;
  }

  updateField(fieldName: string, selectedHeader: string) {
    debugger;
    if (selectedHeader === null || selectedHeader === '' || selectedHeader === undefined) {
      this.validSubmitCounter -= 1;
      if (fieldName == 'lineNumber') {
        this.isLineNumberSelected = false;
      }
      delete this.fieldMappings[fieldName];
    }

    else if (fieldName == 'lineNumber') {
      this.isLineNumberSelected = true;
      this.mapSidebarFields(fieldName, selectedHeader);
    }
    else {
      this.mapSidebarFields(fieldName, selectedHeader);
    }
  }
  mapSidebarFields(fieldName: string, selectedHeader: string) {
    this.fieldMappings[fieldName] = selectedHeader;
    this.validSubmitCounter += 1;
  }

  onRowEdit(row: any) {
    this.selectedRow = row;
    console.log(this.selectedRow);
  }

  private readExcelHeaders(file: File): void {

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = new Uint8Array(fileReader.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const dataSheet: any = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      this.excelHeaders = dataSheet[0];
      this.showSidebar = true;
    };
    fileReader.readAsArrayBuffer(file);
    this.dynamicFileInput.value = '';
  }
  private convertBase64ToExcel(base64String: string) {
    // Decode the base64 string into a binary string
    const binaryString = atob(base64String);

    // Convert the binary string into a byte array
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    import("xlsx").then(xlsx => {
      const workbook = xlsx.read(bytes, { type: 'array' })
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "payrolls");
    });
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {

    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  isAllSelected(dataSource: MatTableDataSource<any>, selection: SelectionModel<any>) {
    const numSelected = selection.selected.length;
    const numRows = dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(dataSource: MatTableDataSource<any>, selection: SelectionModel<any>) {
    debugger;
    this.isAllSelected(dataSource, selection)
      ? selection.clear()
      : dataSource.data.forEach(row => selection.select(row));
  }

  deleteTimesheetLines() {
    debugger;
    this.showSpinner = true;
    let timesheetLines = this.timesheetLinesSelection.selected.map(x => ({
      RecId: x.recId
    }));
    this.timesheetService.deleteTimesheetLines(this.selectedTimesheet.timesheetId, timesheetLines).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.dataSource.data = this.dataSource.data.filter(
            (item: any) => !timesheetLines.some((line: any) => line.RecId === item.recId));
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.return ?? "Timesheet lines deleted successfully" });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occurred while deleting timesheet lines" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "An error has occurred while deleting timesheet lines" });
      }
    )
  }

  isEditable() {
    if (this.selectedTimesheet.timesheetStatus == 'Approved' || this.selectedTimesheet.timesheetStatus == 'Invoiced')
      return false;
    return true;
  }
}
export interface pageSelection {
  skip: number;
  limit: number;
}

