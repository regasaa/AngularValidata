import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {


  error = '';
  message = '';

  public form: FormGroup;

  public data: any = {
    email: "",
  };

  constructor(private authService: AuthService, private notificationService: NotificationService) {

    this.form = new FormGroup({
      email: new FormControl(this.data.email, [
        Validators.required,
        Validators.email,
      ])
    });
  }

  ngOnInit(): void {
  }


  public submitForm(): void {
    if (this.form.valid) {
      this.authService.deleteUser(this.form.value.email)
        .subscribe(
          data => {

            if (data == null) {
              this.message = "User Not Exist"
              this.showWarn()
            } else {
              this.message = "Successful User Deleted"
              this.showSuccess();
            }

          },
          error => {
            this.message = "Error while User Deleted"
            this.showError();
            this.error = error;
          });
    } else {
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
  public showWarn(): void {
    this.notificationService.show({
      content: this.message,
      hideAfter: 600,
      position: { horizontal: "center", vertical: "top" },
      animation: { type: "fade", duration: 600 },
      type: { style: "warning", icon: true },
    });
  }

  public clearForm(): void {
    this.form.reset();
  }
}
