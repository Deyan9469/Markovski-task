import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../types/user';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[] | null = [];
  modalRef!: NgbModalRef;
  userIdToDelete: string = '';

  constructor(private userService: UserService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  onDelete(id: string): void {
    this.userIdToDelete = id;
    this.openPopup();
  }

  openPopup(): void {
    this.modalRef = this.modalService.open(PopupComponent);
    this.modalRef.componentInstance.saveChangesClicked.subscribe(() => {
      this.deleteUser();
      this.modalRef.close();
    });
  }

  deleteUser(): void {
    if (!this.userIdToDelete) {
      return;
    }
    this.userService.onDelete(this.userIdToDelete).subscribe(() => {
      this.ngOnInit();
    });
  }
}
