import { Component, ViewChild } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent {
  public routes = routes;
  @ViewChild('imagePond', { static: false }) imagePond: any;
  pondOptions = {
    class: 'my-filepond',
    multiple: true,
    labelIdle: 'Browse and Drop files here',
    acceptedFileTypes: 'image/jpeg, image/png',
  };

  pondFiles = ['assets/img/logo2.png'];
}
