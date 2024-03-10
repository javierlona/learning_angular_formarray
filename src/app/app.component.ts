import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular_form_array';
  staticArray = [0,1,2,3,4];
  acceptanceDateForm: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.acceptanceDateForm = this.formBuilder.group({
      dates: this.formBuilder.array([], [Validators.required, this.dateValidator])
    })
    this.addFormControls();
  }

  get dates(): FormArray {
    return this.acceptanceDateForm.get('dates') as FormArray;
  }

  addFormControls() {
    this.staticArray.forEach(() => {
      this.dates.push(this.formBuilder.control(''));
    });
  }

  handleClick() {
    const formArrayValues = this.acceptanceDateForm.get('dates')?.value;
    console.log(formArrayValues);
  }

  dateValidator(control: AbstractControl) {
    const currentDate = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    const controlDate = new Date(control.value);
  
    if (controlDate < oneYearAgo || controlDate > currentDate) {
      console.log("Date is invalid!")
      return { invalidDate: true };
    }
    console.log("Date is valid!")
    return null;
  }
}
