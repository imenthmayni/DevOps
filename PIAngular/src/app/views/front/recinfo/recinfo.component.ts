import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recruitment } from 'src/app/core/Models/recruitment';

@Component({
  selector: 'app-recinfo',
  templateUrl: './recinfo.component.html',
  styleUrls: ['./recinfo.component.css']
})
export class RecinfoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public recDetails: Recruitment) {}

}
