import { Component, OnDestroy, OnInit } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { Editor, Toolbar, Validators } from 'ngx-editor';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {
  public routes = routes;
  isClassAdded = false;
  isHiddenTask = false;

  isTaskCompleted: boolean[] = [false];

  toggleTaskCompleted(index: number) {
    this.isTaskCompleted[index] = !this.isTaskCompleted[index];
  }

  public isHidden: boolean[] = [false];
  toggleVisibility(index: number) {
    this.isHidden[index] = !this.isHidden[index];
  }
  addClass() {
    this.isClassAdded = !this.isClassAdded;
  }
  taskDelete() {
    this.isHiddenTask = !this.isHiddenTask;
  }

  typeInfo1() {
    this.toastr.info('Patient appointment booking marked as completed');
  }
  typeInfo2() {
    this.toastr.info(
      'Appointment booking with payment gateway marked as completed'
    );
  }
  typeInfo3() {
    this.toastr.info('Doctor available module marked as completed');
  }
  typeInfo4() {
    this.toastr.info(
      'Patient and Doctor video conferencing marked as completed'
    );
  }
  typeInfo5() {
    this.toastr.info('Private chat module marked as completed');
  }
  typeInfo6() {
    this.toastr.info('Patient Profile add marked as completed');
  }
  deleteToastr1() {
    this.toastr.info('Patient appointment booking has been deleted');
  }
  deleteToastr2() {
    this.toastr.info(
      'Appointment booking with payment gateway has been deleted'
    );
  }
  deleteToastr3() {
    this.toastr.info('Doctor available module has been deleted');
  }
  deleteToastr4() {
    this.toastr.info('Patient and Doctor video conferencing has been deleted');
  }
  deleteToastr5() {
    this.toastr.info('Private chat module has been deleted');
  }
  deleteToastr6() {
    this.toastr.info('Patient Profile add has been deleted');
  }
  constructor(private toastr: ToastrService) {}
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
