import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.css']
})
export class FileViewComponent implements OnInit {

  fileUrlSigned:any;
  showHtml:boolean = false;
  
  file:any;
  isVideo:boolean = false;
  isAudio:boolean = false;
  isImage:boolean = false;
  isPdf:boolean = false;
  isNothing:boolean = false;

  urlPdf:any;

  constructor(private fileService:FileService,
              private activatedRoute:ActivatedRoute,
              private authService:AuthService,
              private router:Router,
              private sanitizer: DomSanitizer) {

            
    this.fileService.getFile(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((resp:any)=>{

      this.file = resp.fileDB;

      // if a user who is not the owner tries to view the file
      if (this.file.user !== this.authService.userInfo.id) {

        this.router.navigateByUrl('/dashboard');
        return;
        
      }else{

        switch (this.file.aws_key.split('.').reverse()[0]) {
          case 'png':
            this.isImage = true;
            break;
  
          case 'jpg':
            this.isImage = true;
            break;
          
          case 'jpeg': 
            this.isImage = true;
            break;
  
          case 'gif':
            this.isImage = true;
            break;
  
          case 'pdf':
            this.isPdf = true;
            
            break;
  
          case 'mp3':
            this.isAudio = true;
            break;
  
          case 'mp4':
            this.isVideo = true;
            break;
        
  
          default: this.isNothing = true
            break;
        }
  
        this.getNewUrl(this.file.aws_key);

      }
   
    })
   }

  ngOnInit(): void {
  }

  getNewUrl(aws_key:any){
    this.fileService.getSignedUrl(aws_key).subscribe((resp:any)=>{
      
      this.fileUrlSigned = this.sanitizer.bypassSecurityTrustResourceUrl(resp.url);
      this.showHtml = true;
      
    })
  }

}
