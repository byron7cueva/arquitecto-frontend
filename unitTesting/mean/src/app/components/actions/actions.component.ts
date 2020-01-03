import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { PinsService } from '../pins/pins.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<ActionsComponent>, private pinsService: PinsService) {}

  public openLink(event: MouseEvent, action: string): void {
    event.preventDefault();
    this.bottomSheetRef.dismiss();
    this.pinsService.resolveActionObserver(action);
  }
}
