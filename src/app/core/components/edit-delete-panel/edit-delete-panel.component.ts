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

  onDeleteClick(event: Event, item: T): void {
    event.stopPropagation()
    this.deleteClick.emit(item);
  }

  onEditClick(event: Event, item: T): void {
    event.stopPropagation()
    this.editClick.emit(item);
  }

}
