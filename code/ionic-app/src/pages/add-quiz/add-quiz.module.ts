import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddQuizPage } from './add-quiz';

@NgModule({
  declarations: [
    AddQuizPage,
  ],
  imports: [
    IonicPageModule.forChild(AddQuizPage),
  ],
})
export class AddQuizPageModule {}
