import { Component } from '@angular/core';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss']
})
export class ApprovalComponent {
  country = 'India';
  public Approver = [0]
  addApprover(){
    this.Approver.push(1);
  }
  dltApproverFunc(index: number){
    this.Approver.splice(index, 1);
  }
  
  
  

  

}
