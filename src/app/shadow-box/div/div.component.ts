import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-div',
  templateUrl: './div.component.html',
  styleUrls: ['./div.component.scss'],
})
export class DivComponent implements OnInit {

  @Input() boxShadow!: string;
  @Input() text!: string;
  @Input() padding!: number;
  @Input() radius!: number;
  constructor() { }

  ngOnInit() {}

}
