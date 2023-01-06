import { AfterViewInit, Component, Input, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { Recipe } from 'src/app/core/services/recipes/recipe.interfaces';
import { Gizmos } from '../gizmos/gizmos';
import { GizmoComponent } from '../steps.interfaces';
import { StepPart, StepPartType } from './step.interfaces';

@Component({
  selector: 'app-recipe-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class RecipeStepComponent implements AfterViewInit {
  @Input() recipe!: Recipe;

  @Input() step!: string;

  @Input() index!: number;

  @ViewChildren('gizmoRef', {read: ViewContainerRef})
  gizmoRefs!: QueryList<ViewContainerRef>;

  parts: StepPart[] = [];

  StepPartType = StepPartType;

  public ngAfterViewInit(): void {
    this.buildParts();
  }

  /**
   * Build step parts
   */
  protected buildParts(): void {
    const parts: StepPart[] = [];

    // Try to find gizmos
    for (const key in Gizmos) {
      const gizmoRegex = new RegExp(`\\[(${key}[^{}]*)\\]`, 'g');
      const matches = [...this.step.matchAll(gizmoRegex)];
      matches.forEach(match => {
        parts.push({
          type: StepPartType.GIZMO,
          raw: match[0],
          options: match[1].split(':'),
          index: match.index ?? 0,
          label: key,
        });
      });
    }

    // Try to find ingredients
    const ingredientsRegex = /{([^{}]*)}/g;
    const matches = [...this.step.matchAll(ingredientsRegex)];
    matches.forEach(match => {
      const part: StepPart = {
        type: StepPartType.INGREDIENT,
        raw: match[0],
        options: match[1].split(':'),
        index: match.index ?? 0,
      }

      // Ingredient label
      if (part.options[0].includes('|')) {
        const labelParts = part.options[0].split('|', 2);
        part.options[0] = labelParts[1];
        part.label = labelParts[0];
      }

      parts.push(part);
    });

    // Sort parts by index
    parts.sort((a, b) => a.index - b.index);

    // Prepend first text part
    if (parts.length === 0 || parts[0].index > 0) {
      parts.splice(0, 0, {
        type: StepPartType.TEXT,
        raw: this.step.slice(0, parts[0]?.index ?? undefined),
        options: [],
        index: 0,
      });
    }

    // Generate text parts between gizmos
    const otherTextParts: StepPart[] = [];
    parts.forEach((part, index) => {
      const isLastPart = (index === parts.length - 1);
      const endPartIndex = part.index + part.raw.length - 1;
      const nextPartIndex = (isLastPart ? this.step.length : parts[index+1].index);

      if (endPartIndex + 1 < nextPartIndex) {
        otherTextParts.push({
          type: StepPartType.TEXT,
          raw: this.step.slice(endPartIndex + 1, nextPartIndex),
          options: [],
          index: endPartIndex + 1,
        });
      }
    });

    // Sort again parts by index
    this.parts = [...parts, ...otherTextParts].sort((a, b) => a.index - b.index);

    // Render gizmos components
    setTimeout(() => {
      let gizmoIndex = 0;
      this.parts.forEach(part => {
        if (part.type === StepPartType.GIZMO) {
          const gizmoRef = this.gizmoRefs.get(gizmoIndex);
          if (gizmoRef) {
            gizmoRef.clear();
            const instance = gizmoRef.createComponent(Gizmos[part.label!]).instance as GizmoComponent;
            instance.recipe = this.recipe;
            instance.step = this.step;
            instance.options = part.options;
          }

          gizmoIndex++;
        }
      });
    });
  }
}
