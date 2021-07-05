import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { AccordionComponent } from './accordion.component';

@NgModule({
  declarations: [AccordionComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [AccordionComponent]
})
export class AccordionModule { }
