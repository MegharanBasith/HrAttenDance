import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import {
  BsDatepickerModule,
  BsDatepickerConfig,
} from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgxEditorModule } from 'ngx-editor';
import { NgxMaskModule } from 'ngx-mask';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ClipboardModule } from 'ngx-clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ToastrModule } from 'ngx-toastr';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LightboxModule } from 'ngx-lightbox';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastModule } from 'primeng/toast';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu'
import { AuthInterceptorService, LanguageInterceptorService } from '../core/core.index';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { MatTabsModule } from '@angular/material/tabs';
import { TableModule } from 'primeng/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DialogModule } from 'primeng/dialog';
import { SpinnerComponent } from '../feature-module/common/spinner/spinner.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MessagesModule } from 'primeng/messages';
import { DeleteModalComponent } from '../feature-module/common/delete-modal/delete-modal.component';
import { EmployeeFilterComponent } from '../feature-module/employee/employees/all-employee/employee-filter/employee-filter.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    BsDatepickerModule.forRoot(),
    MatSelectModule,
    TimepickerModule.forRoot(),
    MatTooltipModule,
    NgxMaskModule.forRoot({
      showMaskTyped: false,
    }),
    NgxEditorModule,
    NgScrollbarModule,
    ClipboardModule,
    DragDropModule,
    ScrollingModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true

    }),
    MatStepperModule,
    MatProgressBarModule,
    LightboxModule,
    TooltipModule.forRoot(),
    NgChartsModule.forRoot(),
    NgApexchartsModule,
    MatSliderModule,
    MatChipsModule,
    CarouselModule,
    ToastModule,
    NgxDropzoneModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    NgxMatSelectSearchModule,
    MatPaginatorModule,
    MatDialogModule,
    SidebarModule,
    TranslateModule,
    DropdownModule,
    ButtonModule,
    MatTabsModule,
    TableModule,
    MatSlideToggleModule,
    DialogModule,
    SpinnerComponent,
    MatCheckboxModule,
    MatMenuModule,
    MessagesModule,
    DeleteModalComponent,
    EmployeeFilterComponent,
    ConfirmDialogModule,
    CalendarModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    BsDatepickerModule,
    MatSelectModule,
    TimepickerModule,
    NgxMaskModule,
    NgScrollbarModule,
    ClipboardModule,
    DragDropModule,
    ScrollingModule,
    ToastrModule,
    MatStepperModule,
    MatProgressBarModule,
    LightboxModule,
    TooltipModule,
    NgChartsModule,
    NgApexchartsModule,
    NgxEditorModule,
    MatSliderModule,
    MatChipsModule,
    CarouselModule,
    ToastModule,
    NgxDropzoneModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatButtonModule,
    MatButtonToggleModule,
    NgxMatSelectSearchModule,
    MatPaginatorModule,
    MatDialogModule,
    SidebarModule,
    TranslateModule,
    DropdownModule,
    ButtonModule,
    MatTabsModule,
    TableModule,
    MatSlideToggleModule,
    DialogModule,
    SpinnerComponent,
    MatCheckboxModule,
    MatMenuModule,
    MessagesModule,
    DeleteModalComponent,
    EmployeeFilterComponent,
    ConfirmDialogModule,
    CalendarModule
  ],

  providers: [BsDatepickerConfig, DatePipe, {
    provide: HTTP_INTERCEPTORS,
    useClass: LanguageInterceptorService,
    multi: true
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }, ConfirmationService,
    MessageService],
})
export class SharedModule { }
