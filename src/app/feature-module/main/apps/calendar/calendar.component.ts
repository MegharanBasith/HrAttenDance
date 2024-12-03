
import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { routes } from 'src/app/core/helpers/routes/routes';
import { MatTableDataSource } from '@angular/material/table';
import { LeaveService } from 'src/app/core/services/leave/leave.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent  {
  public routes = routes;
  country = 'India';
  calendarVisible = true;
  dataSource = new MatTableDataSource<any>();
  showSpinner: boolean = false;
  projectId !: string;
  @ViewChild(MatSort) sort!: MatSort;
  leaveRecordCount: number = 0;

  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  constructor(private changeDetector: ChangeDetectorRef,private leaveService: LeaveService)
  {
    let unparsedProjectId = localStorage.getItem('projectId');
    if(unparsedProjectId)
      this.projectId = unparsedProjectId;

    this.getLeaveList(1,100);
  }


  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  getLeaveList(startIndex: number, pageSize: number) {
    this.showSpinner = true;
    this.leaveService.getLeaveList(this.projectId, startIndex, pageSize).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.dataSource.data = response.data.leaveList;
          this.dataSource.sort = this.sort;
          this.leaveRecordCount = response.data.totalRecordsCount;

          // Map leave data to calendar events
          const events: EventInput[] = response.data.leaveList.map((leave: any) => ({
            title: `VacationType - ${leave.vacationTypeStr} - EmpId - ${leave.empNum}`, // Customize as needed
            start: leave.startDate,
            end: leave.endDate, // Optional: include if you want multi-day events
            allDay: true, // Set this based on your needs
            extendedProps: { // Attach additional leave info if needed
              requestId: leave.requestId,
              workflowName: leave.workflowName,
            }
          }));

          // Set events in the calendar
          this.calendarOptions = {
            ...this.calendarOptions,
            events: events,
          };
        }
      },
      (error) => {
        this.showSpinner = false;
        console.error(error);
      }
    );
  }
}
