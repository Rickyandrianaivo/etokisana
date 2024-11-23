import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-button',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './default-button.component.html',
  styleUrl: './default-button.component.css'
})
export class DefaultButtonComponent {
  @Input()
  type: 'submit' | 'button' = 'submit';
  @Input()
  text:string = 'Submit';
  @Input()
  bgColor = '#1877f2';
  @Input()
  color = 'white';
  @Input()
  fontSizeRem = .8;
  @Input()
  widthRem = 10;
  @Output()
  onClick = new EventEmitter();
}
