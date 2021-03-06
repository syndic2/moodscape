import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertController, ToastController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { Plugins } from '@capacitor/core';
import '@codetrix-studio/capacitor-google-auth';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.page.html',
	styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
	public signInForm: FormGroup;
	public errorMessages = {
		emailOrUsername: [
			{ type: 'required', message: 'Alamat surel atau nama pengguna tidak boleh kosong.' }
		],
		password: [
			{ type: 'required', message: 'Kata sandi tidak boleh kosong.' }
		]
	};
	private signInListener: Subscription;

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private alertController: AlertController,
		private toastController: ToastController,
		private authService: AuthenticationService
	) {
		this.initializeForm();
	}

	ngOnInit() {
	}

	ionViewDidLeave() {
		this.signInForm.reset();
		this.signInListener && this.signInListener.unsubscribe();
	}

	get emailOrUsername() {
		return this.signInForm.get('emailOrUsername');
	}

	get password() {
		return this.signInForm.get('password');
	}

	private initializeForm() {
		this.signInForm = this.formBuilder.group({
			emailOrUsername: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	async onSubmit() {
		if (this.signInForm.invalid) {
			const alert = await this.alertController.create({
				message: 'Kolom input ada yang kosong atau inputan tidak valid!',
				buttons: ['OK']
			});
			alert.present();
		} else {
			this.signInListener= this.authService.login(this.signInForm.value).subscribe(async res => {
				const response = res[0];

				if (!response.status) {
					const toast = await this.toastController.create({
						message: response.text,
						position: 'top',
						duration: 2000
					});
					toast.present();
				} else {
					this.router.navigate(['/side-menu']);
				}
			});
		}
	}

	async onGoogleSignIn() {
		const accountInfo = await Plugins.GoogleAuth.signIn();
		const data = {
			firstName: accountInfo.givenName,
			lastName: accountInfo.familyName,
			email: accountInfo.email,
			password: 'google-account',
			imgUrl: accountInfo.imageUrl
		};

		this.signInListener= this.authService.login(data, true).subscribe(async res => {
			const response = res[0];

			if (!response.status) {
				const toast = await this.toastController.create({
					message: response.text,
					position: 'top',
					duration: 2000
				});
				toast.present();
			} else {
				this.router.navigate(['/side-menu']);
			}
		});
	}
}
