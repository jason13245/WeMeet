import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShareLinkPage } from './share-link';

@NgModule({
  declarations: [
    ShareLinkPage,
  ],
  imports: [
    IonicPageModule.forChild(ShareLinkPage),
  ],
})
export class ShareLinkPageModule {}
