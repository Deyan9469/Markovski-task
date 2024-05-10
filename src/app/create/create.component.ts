import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      day: [''],
      month: [''],
      year: ['']
    });
  }

  onSubmit() {
    const dob = {
      day: this.form.value.day,
      month: this.form.value.month,
      year: this.form.value.year
    };
  }
  
}
