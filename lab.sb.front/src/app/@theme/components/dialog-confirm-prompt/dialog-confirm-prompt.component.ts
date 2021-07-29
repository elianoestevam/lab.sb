import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-dialog-confirm-prompt',
  templateUrl: 'dialog-confirm-prompt.component.html',
  styleUrls: ['dialog-confirm-prompt.component.scss'],
})
export class DialogConfirmPromptComponent {

  @Input() message: string;
  
  constructor(protected ref: NbDialogRef<DialogConfirmPromptComponent>) {}

  action(result){
    this.ref.close(result);
  }
}
