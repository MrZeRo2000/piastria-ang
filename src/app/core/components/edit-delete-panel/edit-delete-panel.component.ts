import {Component, input, output} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-core-edit-delete-panel',
  templateUrl: './edit-delete-panel.component.html',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  styleUrls: ['./edit-delete-panel.component.scss']
})
export class EditDeletePanelComponent<T> {

  item = input<T>();

  deleteClick = output<T>();
  editClick = output<T>();

  onDeleteClick(item: T): void {
    this.deleteClick.emit(item);
  }

  onEditClick(item: T): void {
    this.editClick.emit(item);
  }

}
