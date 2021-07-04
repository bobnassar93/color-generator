import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {

  @Input() text = 'Click';
  @Input() style = '';
  @Input() class = '';
  @Input() color = '';
  @Input() size = '';
  @Input() radius = '';
  @Input() boxShadow = '';
  constructor() { }

  ngOnInit(): void {}

}
