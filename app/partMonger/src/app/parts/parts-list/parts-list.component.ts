import { Component, Input } from '@angular/core';
import { Part } from '../../types/parts';

@Component({
  selector: 'app-parts-list',
  templateUrl: './parts-list.component.html',
  styleUrls: ['./parts-list.component.scss'],
})
export class PartsListComponent {
  @Input() parts: Part[] = [];

  track(_: number, part: Part) {
    return part.id;
  }
}
