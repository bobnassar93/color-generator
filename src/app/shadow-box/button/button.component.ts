import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {

  @Input() text!: string;
  @Input() style!: string;
  @Input() class!: string;
  @Input() color!: string;
  @Input() size!: string;
  @Input() radius!: string;
  @Input() boxShadow!: string;
  constructor() { }

  ngOnInit(): void {}

}
