import { OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';

declare var bootstrap: any;
@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [TranslateModule, DialogModule],
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

  display: boolean = false;

  @Output() confirm: EventEmitter<void> = new EventEmitter();
  @Input() actionType: string = '';

  show(action: string) {
    this.actionType = action;
    this.display = true;
  }

  onConfirm() {
    this.confirm.emit();
    this.display = false;
  }

  onCancel() {
    this.display = false;
  }

  get confirmationMessage(): string {
    switch (this.actionType) {
      case 'delete':
        return 'Are you sure you want to delete this item?';
      case 'fail':
        return 'Are you sure you want to mark this item as failed?';
      case 'success':
        return 'Are you sure you want to mark this item as successful?';
      case 'underProcess':
        return 'Are you sure you want to mark this item as under process?';
      case 'submit':
        return 'Are you sure you want to submit this item?';
      case 'hold':
        return 'Are you sure you want to hold this item?';
      case 'proccess':
        return 'Are you sure you want to proccess this item?';
      default:
        return 'Are you sure you want to proceed with this action?';
    }
  }

}
