import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextEditorRoutingModule } from './text-editor-routing.module';
import { TextEditorComponent } from './text-editor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditorModule } from 'primeng/editor';

@NgModule({
  declarations: [TextEditorComponent],
  imports: [CommonModule, TextEditorRoutingModule, SharedModule, EditorModule],
})
export class TextEditorModule {}
