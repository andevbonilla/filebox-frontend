import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FolderService } from 'src/app/services/folder.service';
import { Location } from '@angular/common'
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-folder-view',
  templateUrl: './folder-view.component.html',
  styleUrls: ['./folder-view.component.css']
})
export class FolderViewComponent implements OnInit {

  @ViewChild("image", {
    read: ElementRef
  }) image: any;

  folder:any;
  showHtml:boolean = false;
  folderFiles:any[] = [];

  uploading:boolean = false;
  popupText:string = '';

  configPopup:boolean = false;
  isInConfig:boolean = true;
  newName:string = '';

  constructor(private folderService:FolderService,
              private activatedRoute:ActivatedRoute,
              private location:Location,
              private userService:UserService,
              private authService:AuthService,
              private router:Router) {

          this.folderService.getFolder(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((resp:any)=>{
            
              this.folder = resp.folderDB;
              this.newName = this.folder.name

              if (this.folder.user !== this.authService.userInfo.id) {

                this.router.navigateByUrl('/dashboard');
                return;
                
              }else{

                this.folderFiles = this.folder.files
                this.showHtml = true;

              }
          })

  }

  ngOnInit(): void {
  
  }

  goBack(){
    this.location.back();
  }

  uploadFile(){

    let files = this.image.nativeElement.files;
    const form = new FormData();
    form.append('fileImg', files[0]);

    this.popupText = 'Uploading'
    this.uploading = true;

    this.userService.uploadImage(form, this.authService.userInfo.id, this.folder._id).subscribe((resp:any)=>{

      this.uploading = false;
      Swal.fire({
        icon: 'success',
        title: 'the file has been uploaded successfully',
      })

      this.folderFiles = [...resp.newFolder.files];

    }, (err)=>{

      this.uploading = false;
      Swal.fire({
        icon: 'error',
        title: 'the file has not been uploaded',
      })

    })
  }

  openConfigFolder(){
    this.configPopup = true;
  }

  closeConfigPopup(){
    this.configPopup = false
  }

  deleteFolder(){

    this.popupText = 'Deleting'
    this.uploading = true;

    this.folderService.deleteFolder(this.folder._id).subscribe(resp=>{

      this.uploading = false;
      this.router.navigateByUrl('/dashboard');

    }, (err)=>{

      this.uploading = false;
      Swal.fire({
        icon: 'error',
        title: "there was an error, please try again later",
      })

    })
  }

  renameFolder(){
  
    this.newName.trim();

    if (this.newName.length <= 0) {
      return;
    }
    
    this.popupText = 'Updating'
    this.uploading = true;
    this.folderService.updateFolder(this.folder._id, this.newName).subscribe((resp:any)=>{

      this.uploading = false;
      this.folder.name = resp.folderDB.name;
      this.isInConfig = true;
      this.configPopup = false;

      Swal.fire({
        icon: 'success',
        title: 'the folder has been renamed successfully',
      })
  

    }, (err)=>{

      this.uploading = false;
      Swal.fire({
        icon: 'error',
        title: 'there was an error, please try again later',
      })

    })

  }
}
