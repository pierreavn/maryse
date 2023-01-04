import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/core/services/recipes/recipe.interfaces';
import { GizmoComponent } from '../../steps.interfaces';

@Component({
  selector: 'app-preheat',
  templateUrl: './preheat.component.html',
  styleUrls: ['./preheat.component.scss']
})
export class PreheatComponent implements GizmoComponent, OnInit {
  @Input() options!: string[];

  constructor() { }

  ngOnInit(): void {
  }
}
