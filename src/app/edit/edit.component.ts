import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { inputValidator } from '../validators/input-validator';
import { imageValidator } from '../validators/imageHttp-validator';
import { PopupComponent } from '../popup/popup.component';
import { User } from '../types/user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    profession: new FormControl(''),
    gender: new FormControl(''),
    image: new FormControl(''),
    day: new FormControl(''),
    month: new FormControl(''),
    year: new FormControl(''),
  });

  modalRef!: NgbModalRef;
  selectedGender: string = '';
  errorMessage: string = '';
  userId: string = '';
  user = {};

  constructor(private userService: UserService, private fb: FormBuilder,
    private modalService: NgbModal, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];

    this.form = this.fb.group({
      firstName: ['', [Validators.required, inputValidator()]],
      lastName: ['', [Validators.required, inputValidator()]],
      profession: ['', [Validators.required, inputValidator()]],
      gender: ['', [Validators.required, inputValidator()]],
      image: ['', [Validators.required, imageValidator()]],
      day: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
    });

    this.userService.getUserById(this.userId).subscribe((user) => {
      this.user = user;

      this.form.patchValue(this.user);
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
    if (this.form.invalid) {
      this.errorMessage = 'Please check all fields'
      return
    }
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let calcAge = currentYear - this.form.value.year;

    let id = this.userId;

    const { ...userData }: User = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      profession: this.form.value.profession,
      gender: this.form.value.gender,
      day: this.form.value.day,
      month: this.form.value.month,
      year: this.form.value.year,
      image: this.form.value.image,
      id: id,
      age: calcAge,
    };

    this.userService.updateUser(id, userData).subscribe({
      next: () => { this.router.navigate(['/']) },
      error: (err) => this.errorMessage = err
    })
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }
}
