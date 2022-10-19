import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Role } from '../model/role';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {

  public phoneNumberValue: string = "";
  public phoneNumberMask: string = "(251) 000-00-00-00";
  error = '';
  message = '';

  public form: FormGroup;

  public data: any = {
    lastName: "",
    firstName: "",
    email: "",
    //role: Array<{ text: string; value: number }>,
    phoneNumber: this.phoneNumberValue,
    arrivalDate: null,
    numberOfNights: null,
    numberOfGuests: null,
    terms: false,
    comments: "",
  };

  selectedValue: string | undefined;

  public listItems: Array<{ text: string; value: number }> = [
    { text: "Admin", value: Role.ADMIN },
    { text: "Manager", value: Role.MANAGER },
    { text: "Editor", value: Role.EDITOR },
  ];

  constructor(private authService: AuthService, private notificationService: NotificationService) {

    this.form = new FormGroup({
      firstName: new FormControl(this.data.firstName, [Validators.required]),
      lastName: new FormControl(this.data.lastName, [Validators.required]),
      email: new FormControl(this.data.email, [
        Validators.required,
        Validators.email,
      ]),
      role: new FormControl(this.data.role, [Validators.required]),
      phoneNumber: new FormControl(this.data.phoneNumber, [
        Validators.required,
      ])

    });
  }
  

  public submitForm(): void {
    if (this.form.valid){
      this.authService.updateUser(this.form.value.email)
      .subscribe(
        data => {
          this.message = "Successful User Updated"
          this.showSuccess();
        },
        error => {
          this.message = "Error While User Update"
          this.showError();
          this.error = error;
        });
    }else{
      this.form.markAllAsTouched();
    }
    
  }

  public showSuccess(): void {
    this.notificationService.show({
      content: this.message,
      hideAfter: 600,
      position: { horizontal: "center", vertical: "top" },
      animation: { type: "fade", duration: 600 },
      type: { style: "success", icon: true },
    });
  }
  public showError(): void {
    this.notificationService.show({
      content: this.message,
      hideAfter: 600,
      position: { horizontal: "center", vertical: "top" },
      animation: { type: "fade", duration: 600 },
      type: { style: "error", icon: true },
    });
  }

  public clearForm(): void {
    this.form.reset();
  }
}
