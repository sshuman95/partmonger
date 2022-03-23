import { Component, Input, OnInit } from '@angular/core';
import { Part } from '../../types/parts';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss'],
})
export class PartComponent implements OnInit {
  @Input() part?: Part;
  constructor() {}

  ngOnInit(): void {}
}
