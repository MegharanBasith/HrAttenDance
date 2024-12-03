import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { routes } from 'src/app/core/helpers/routes/routes';



@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  public routes = routes;
  public addContactForm!: FormGroup ;
  public editContactForm!: FormGroup ;
  public allContacts: Array<object> = [];
  public contactSidebar = ["company", "client", "staff"];
  public searchText!: string;
  public url = "contacts";
  constructor(private formBuilder: FormBuilder,

) { }

    // getContact() {
    //   this.allModuleService.get(this.url).subscribe((data) => {
    //     this.allContacts = data;
    //   });
    // }

  ngOnInit(): void {
    // this.getContact();
     // Add Contact Form Validation And Getting Values

     this.addContactForm = this.formBuilder.group({
      contactName: ["", [Validators.required]],
      contactNumber: ["", [Validators.required]],
      contactEmail: ["", [Validators.required]],
    });

    // Edit Contact Form Validation And Getting Values

    this.editContactForm = this.formBuilder.group({
      editContactName: ["", [Validators.required]],
      editContactEmail: ["", [Validators.required]],
      editContactNumber: ["", [Validators.required]],
    });
  }


}
