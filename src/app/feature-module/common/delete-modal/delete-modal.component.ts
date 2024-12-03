import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';

declare var bootstrap: any;


@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [TranslateModule, DialogModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {
  // @Input() title: string = '';
  // @Input() set deleteSuccess(value: boolean) {
  //   if (value) {
  //     this.closeModal();
  //   }
  // }
//@Output() confirmed = new EventEmitter<void>();
//@ViewChild('deleteDialog') deleteDialog!: ElementRef;

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['deleteSuccess'] && changes['deleteSuccess'].currentValue) {
  //     this.closeModal();
  //   }
  // }

  // confirm() {
  //   this.confirmed.emit();
  // }
  // closeModal() {
  //   debugger;
  //   const modal = new bootstrap.Modal(this.deleteDialog.nativeElement);
  //   modal.hide();
  // }

  display: boolean = false;

  @Output() confirm: EventEmitter<void> = new EventEmitter();

  show() {
    this.display = true;
  }

  onConfirm() {
    this.confirm.emit();
    this.display = false;
  }

  onCancel() {
    this.display = false;
  }
}
