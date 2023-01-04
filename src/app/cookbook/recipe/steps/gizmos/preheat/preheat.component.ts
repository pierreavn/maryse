import { Component, Input, OnInit } from '@angular/core';
import { GizmoComponent } from '../../steps.interfaces';

@Component({
  selector: 'app-preheat',
  templateUrl: './preheat.component.html',
  styleUrls: ['./preheat.component.scss']
})
export class PreheatComponent implements GizmoComponent, OnInit {
  @Input() options!: string[];

  temperature!: string;

  unit!: string;

  public ngOnInit(): void {
    const value = this.options[1] ?? '';
    this.temperature = value.slice(0, -1);
    this.unit = value.slice(-1);
  }
}
