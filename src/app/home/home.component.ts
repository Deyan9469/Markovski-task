import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../types/user';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../popup/popup.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[] | null = [];
  pagedUsers: User[] = [];
  modalRef!: NgbModalRef;
  userIdToDelete: string = '';
  currentPage = 1;
  pageSize = 3;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.route.queryParams.subscribe(params => {
        this.currentPage = params['page'] ? +params['page'] : 1;
        this.updatePagedUsers();
      });
    });
  }

  updatePagedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedUsers = this.users ? this.users.slice(startIndex, endIndex) : [];
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.router.navigate([], { queryParams: { page: page }, queryParamsHandling: 'merge' });
      this.currentPage = page;
      this.updatePagedUsers();
    }
  }

  get totalPages(): number {
    return Math.ceil((this.users?.length || 0) / this.pageSize);
  }

  get pages(): number[] {
    const pagesArray: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
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
