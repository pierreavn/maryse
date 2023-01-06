import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-section',
  templateUrl: './recipe-section.component.html',
  styleUrls: ['./recipe-section.component.scss']
})
export class RecipeSectionComponent implements OnInit {
  @Input() title?: string;

  @Input() noDivider?: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
