import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/core/Services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  constructor(private fileUploadService: FileUploadService) { }

  // onFileSelected(event: any): void {
  //   const file: File = event.target.files[0];
  //   this.uploadFile(file);
  // }

  // uploadFile(file: File): void {
  //   this.fileUploadService.uploadFile(file).subscribe(
  //     (response) => {
  //       console.log('File uploaded successfully:', response);
  //     }
  //   );
  // }
  
}
