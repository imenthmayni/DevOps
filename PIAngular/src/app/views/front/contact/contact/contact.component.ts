import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/Services/contact.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  message: string = '';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  submitForm(): void {
    const formData = {
      name: this.contactForm.get('name')?.value,
      email: this.contactForm.get('email')?.value,
      subject: this.contactForm.get('subject')?.value,
      messageBody: this.contactForm.get('message')?.value
    };
    
    this.contactService.sendEmail(formData)
      .subscribe(
        (response: any) => { // Utilisation du type 'any' pour la réponse
          console.log('Email sent successfully', response);
          if (response.status === 200) {
            this.message = 'Email sent successfully';
            this.contactForm.reset();
          } else {
            this.message = 'Email sent successfully';
          }
        },
        error => {
          console.error('Email sent successfully', error);
          this.message = 'Failed to send email';
        }
      );
  }
  
    }



