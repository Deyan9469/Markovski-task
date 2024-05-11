import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Output() saveChangesClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(private route: Router, private activeModal: NgbActiveModal) { }

  saveChanges() {
    this.saveChangesClicked.emit();
    this.route.navigate(['/']);
  }
  closePopup() {
    this.activeModal.dismiss();
  }
}
