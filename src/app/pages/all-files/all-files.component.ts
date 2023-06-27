import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-all-files',
  templateUrl: './all-files.component.html',
  styleUrls: ['./all-files.component.css']
})
export class AllFilesComponent implements OnInit {

  files:any[] = [];
  showHtml:boolean = false;

  constructor(private fileService:FileService,
              private authService:AuthService) { }

  ngOnInit(): void {
    this.fileService.getFiles(this.authService.userInfo.id,0).subscribe((resp:any)=>{
      this.files = resp.filesDB;
      this.showHtml = true
    })
  }

}
