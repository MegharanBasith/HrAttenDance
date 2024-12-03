import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';


@Component({
  selector: 'app-leave-settings',
  templateUrl: './leave-settings.component.html',
  styleUrls: ['./leave-settings.component.scss'],
})
export class LeaveSettingsComponent {
  public routes = routes;
  isEditingDays = false; 
  isEditingCarryForward = false; 
  isEditingEarned = false; 
  isEditingSick = false; 
  isEditingAnnual = false; 
  isEditingPaternity = false; 
  isEditingMaternity = false; 
  isEditingLop = false; 
  isEditingLopCarryForward = false; 
  isEditingLopEarned = false; 


  enableEdit(section: string) {
    if (section === 'days') {
      this.isEditingDays = true;
    } else if (section === 'carryForward') {
      this.isEditingCarryForward = true;
    } else if (section === 'earned') {
      this.isEditingEarned = true;
    } else if (section === 'sick') {
      this.isEditingSick = true;
    } else if (section === 'annual') {
      this.isEditingAnnual = true;
    } else if (section === 'paternity') {
      this.isEditingPaternity = true;
    } else if (section === 'maternity') {
      this.isEditingMaternity = true;
    } else if (section === 'lop') {
      this.isEditingLop = true;
    } else if (section === 'lopCarryForward') {
      this.isEditingLopCarryForward = true;
    } else if (section === 'lopEarned') {
      this.isEditingLopEarned = true;
    }
  }

  cancelEdit(section: string) {
    if (section === 'days') {
      this.isEditingDays = false;
    } else if (section === 'carryForward') {
      this.isEditingCarryForward = false;
    } else if (section === 'earned') {
      this.isEditingEarned = false;
    } else if (section === 'sick') {
      this.isEditingSick = false;
    } else if (section === 'annual') {
      this.isEditingAnnual = false;
    } else if (section === 'paternity') {
      this.isEditingPaternity = false;
    } else if (section === 'maternity') {
      this.isEditingMaternity = false;
    } else if (section === 'lop') {
      this.isEditingLop = false;
    } else if (section === 'lopCarryForward') {
      this.isEditingLopCarryForward = false;
    } else if (section === 'lopEarned') {
      this.isEditingLopEarned = false;
    } 
  }

  saveChanges(section: string) {
    if (section === 'days') {
      this.isEditingDays = false;
    } else if (section === 'carryForward') {
      this.isEditingCarryForward = false;
    } else if (section === 'earned') {
      this.isEditingEarned = false;
    } else if (section === 'sick') {
      this.isEditingSick = false;
    } else if (section === 'annual') {
      this.isEditingAnnual = false;
    } else if (section === 'paternity') {
      this.isEditingPaternity = false;
    } else if (section === 'maternity') {
      this.isEditingMaternity = false;
    } else if (section === 'lop') {
      this.isEditingLop = false;
    } else if (section === 'lopCarryForward') {
      this.isEditingLopCarryForward = false;
    } else if (section === 'lopEarned') {
      this.isEditingLopEarned = false;
    }
  }
  isToggleOn1 = true; 
  isToggleOn2 = true;
  isToggleOn3 = true;
  isToggleOn4 = true;
  isToggleOn5 = true;
  isToggleOn6 = true;

  toggleSwitch1() {
    this.isToggleOn1 = !this.isToggleOn1;
  }
  toggleSwitch2() {
    this.isToggleOn2 = !this.isToggleOn2;
  }
  toggleSwitch3() {
    this.isToggleOn3 = !this.isToggleOn3;
  }
  toggleSwitch4() {
    this.isToggleOn4 = !this.isToggleOn4;
  }
  toggleSwitch5() {
    this.isToggleOn5 = !this.isToggleOn5;
  }
  toggleSwitch6() {
    this.isToggleOn6 = !this.isToggleOn6;
  }

  optionsFrom = [
    { label: 'Bernardo Galaviz', value: 1 },
    { label: 'Jeffrey Warden', value: 2 },
    { label: 'John Doe', value: 3 },
    { label: 'John Smith', value: 4 },
    { label: 'Mike Litorus', value: 5 },
  ];

  selectedFrom: number[] = [];
  selectedTo: number[] = [];
  optionsTo: { label: string; value: number }[] = [];

  moveRightAll() {
    this.optionsTo = [...this.optionsTo, ...this.optionsFrom];
    this.optionsFrom = [];
  }

  moveRightSelected() {
    const selectedValues = this.selectedFrom.slice();
    this.optionsTo = [
      ...this.optionsTo,
      ...this.optionsFrom.filter((option) => selectedValues.includes(option.value)),
    ];
    this.optionsFrom = this.optionsFrom.filter((option) => !selectedValues.includes(option.value));
    this.selectedFrom = [];
  }

  moveLeftSelected() {
    const selectedValues = this.selectedTo.slice();
    this.optionsFrom = [
      ...this.optionsFrom,
      ...this.optionsTo.filter((option) => selectedValues.includes(option.value)),
    ];
    this.optionsTo = this.optionsTo.filter((option) => !selectedValues.includes(option.value));
    this.selectedTo = [];
  }

  moveLeftAll() {
    this.optionsFrom = [...this.optionsFrom, ...this.optionsTo];
    this.optionsTo = [];
  }
}
