import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../types/user';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModalRef
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  form!: FormGroup;
  modalRef!: NgbModalRef; // Declare NgbModalRef

  constructor(private fb: FormBuilder, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      profession: [''],
      gender: [''],
      image: [''],
      day: [''],
      month: [''],
      year: [''],
    });
  }

  openPopup() {
    this.modalRef = this.modalService.open(PopupComponent);
    this.modalRef.componentInstance.saveChangesClicked.subscribe(() => {
      this.onSubmit();
      this.modalRef.close();
    });
  }

  onSubmit() {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let calcAge = currentYear - this.form.value.year;

    let id = Math.floor(Math.random() * 100).toString();

    const userData: User = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      profession: this.form.value.profession,
      gender: this.form.value.gender,
      day: this.form.value.day,
      month: this.form.value.month,
      year: this.form.value.year,
      image: this.form.value.image,
      _id: id,
      age: calcAge,
    };
    console.log(userData);
    console.log(calcAge);
    console.log(id);

  }
}

