import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

export interface lstProgress {
  id: number;
  taskname: string;
  taskpriority: string;
  duedate: string;
  followers: string;
  status: string;
}
@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
})
export class TaskBoardComponent implements OnInit {
  public lstTasks: Array<lstProgress> =[] ;
  public lstProgress: Array<lstProgress> =[] ;
  public lstCompleted: Array<lstProgress> =[];
  public lstInprogress: Array<lstProgress> =[] ;
  public lstHold:Array<lstProgress> =[];
  public lstReview: Array<lstProgress> =[];
  public url = "taskboard";
  public droppedItems: Array<lstProgress> = [];




  ngOnInit(): void {
    (this.lstProgress = [
      {
        id: 1,
        taskname: "John deo",
        taskpriority: "Medium",
        duedate: "02-05-2023",
        followers: "John deo",
        status: "Active",
      },
    ]),
      (this.lstCompleted = [
        {
          id: 1,
          taskname: "John smith",
          taskpriority: "Low",
          duedate: "15-08-2023",
          followers: "John deo",
          status: "Active",
        },
      ]),
      (this.lstInprogress = [
        {
          id: 1,
          taskname: "John deo",
          taskpriority: "Medium",
          duedate: "02-05-2023",
          followers: "John deo",
          status: "Active",
        },
      ]);
    (this.lstHold = [
      {
        id: 1,
        taskname: "John deo",
        taskpriority: "Medium",
        duedate: "02-05-2023",
        followers: "John deo",
        status: "Active",
      },
    ]),
      (this.lstReview = [
        {
          id: 1,
          taskname: "John deo",
          taskpriority: "Medium",
          duedate: "02-05-2023",
          followers: "John deo",
          status: "Active",
        },
      ]),
      (this.droppedItems = [
        {
          id: 1,
          taskname: "website redesign",
          taskpriority: "Medium",
          duedate: "02-05-2023",
          followers: "John deo",
          status: "Active",
        },
        {
          id: 2,
          taskname: "Make a wireframe",
          taskpriority: "High",
          duedate: "02-05-2023",
          followers: "Richard deo",
          status: "Active",
        },
      ]);
    
  }

  //  drap and drop 
  onDrop(event: CdkDragDrop<lstProgress[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  }
  
export interface lstProgress {
  id: number,
  taskname: string,
  taskpriority: string,
  duedate: string,
  followers: string,
  status: string,
}




