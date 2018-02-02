import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateDatePage } from './create-date';

@NgModule({
  declarations: [
    CreateDatePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateDatePage),
  ],
})
export class CreateDatePageModule {}
