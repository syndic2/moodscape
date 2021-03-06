import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertController, ToastController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { MatchValidator } from 'src/app/validators/match.validator';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  public signUpForm: FormGroup;
  public errorMessages= {
    firstName: [
      { type: 'required', message: 'Nama depan tidak boleh kosong.' }
    ],
    lastName: [
      { type: 'required', message: 'Nama belakang tidak boleh kosong.' }
    ],
    gender: [
      { type: 'required', message: 'Jenis kelamin tidak boleh kosong.' }
    ],
    age: [
      { type: 'required', message: 'Umur tidak boleh kosong.' }
    ],
    email: [
      { type: 'required', message: 'Alamat surel tidak boleh kosong.' },
      { type: 'pattern', message: 'Alamat surel tidak valid.' }
    ],
    username: [
      { type: 'required', message: 'Nama pengguna tidak boleh kosong.' }
    ],
    password: [
      { type: 'required', message: 'Kata sandi tidak boleh kosong.' }
    ],
    confirmPassword: [
      { type: 'required', message: 'Konfirmasi kata sandi tidak boleh kosong.' }
    ]
  };
  private signUpListener: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private toastController: ToastController,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  ionViewWillLeave() {
	  this.signUpListener && this.signUpListener.unsubscribe();
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  initializeForm() {
    this.signUpForm= this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ]
      ],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MatchValidator('password', 'confirmPassword')
    });
  }

  async onSubmit() {
    const alert= await this.alertController.create({ buttons: ['OK'] });

    if (this.signUpForm.invalid) {
      alert.message= 'Informasi pengguna ada yang kosong atau tidak valid!';
      alert.present();
    } else {
      this.signUpListener= this.userService.createUser(this.signUpForm.value).subscribe(async res => {
        if (!res.response.status) {
          const toast= await this.toastController.create({
            message: res.response.text,
            position: 'top',
            duration: 2000
          });
          toast.present();
        } else {
          alert.message= res.response.text;
          alert.present();
          this.signUpForm.reset();
        }
      });
    }
  }
}
