import { NgModule } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import {
  IconChevronLeft,
  IconChefHat,
  IconFlag,
  IconToolsKitchen2,
  IconPlus,
  IconMinus,
  IconCooker,
} from 'angular-tabler-icons/icons';

const icons = {
  IconChevronLeft,
  IconChefHat,
  IconFlag,
  IconToolsKitchen2,
  IconPlus,
  IconMinus,
  IconCooker,
};

@NgModule({
  imports: [
    TablerIconsModule.pick(icons)
  ],
  exports: [
    TablerIconsModule
  ]
})
export class IconsModule {}
