import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Part } from '../../types/parts';
import { PartService } from '../parts.service';

@Component({
  selector: 'app-manage-parts',
  templateUrl: './manage-parts.component.html',
  styleUrls: ['./manage-parts.component.scss'],
})
export class ManagePartsComponent implements OnInit {
  constructor(private partService: PartService) {}
  partList$?: Observable<Part[]>;

  ngOnInit(): void {
    this.partList$ = this.partService.getParts();
  }
}
