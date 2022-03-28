import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Part } from '../../types/parts';
import { PartService } from '../parts.service';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss'],
})
export class PartComponent {
  @Input() part!: Part;

  constructor(private partService: PartService, private router: Router) {}

  handleReceive(id: number) {
    this.partService
      .receivePart(id)
      .subscribe((res) => this.partService.handleUpdateQuantity(res));
  }

  handleConsume(id: number) {
    this.partService
      .consumePart(id)
      .subscribe((res) => this.partService.handleUpdateQuantity(res));
  }

  handleNavigate(id: number) {
    this.router.navigateByUrl(`manage/${id}`);
  }
}
