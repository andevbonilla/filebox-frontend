import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FolderService } from 'src/app/services/folder.service';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-options-window',
  templateUrl: './options-window.component.html',
  styleUrls: ['./options-window.component.css']
})
export class OptionsWindowComponent implements OnInit {

  @ViewChild("image", {
    read: ElementRef
  }) image: any;

  showAddNewFolder:boolean = false;
  foldername:string = '';
  uploading:boolean = false;
  popupText:string = '';


  constructor(public globalVariablesService:GlobalVariablesService,
              private folderService:FolderService,
              private authService:AuthService,
              private userService:UserService) { }

  ngOnInit(): void {
  }

  closePopup(){
    this.globalVariablesService.showOptionsWindow = false
    this.showAddNewFolder = false;
  }

  createNewFolder(){

    if(this.foldername.length <= 0 || this.foldername.length > 50){
      Swal.fire({
        icon: 'error',
        title: 'the name must be at least 1 character',
      })
      return;
    }

    this.globalVariablesService.showOptionsWindow = false;
    this.popupText = 'Creating';
    this.uploading = true;

    this.folderService.createFolder({name:this.foldername, user:this.authService.userInfo.id}).subscribe((resp:any)=>{
      
      this.globalVariablesService.userFolders.push(resp.folderDB);

      this.uploading = false

      Swal.fire({
        icon: 'success',
        title: 'the folder has been created successfully',
      })

    }, (err)=>{

      this.uploading = false
      
      Swal.fire({
        icon: 'error',
        title: 'there was an error',
      })

    })

  }

  uploadFile(){

    let files = this.image.nativeElement.files;
    const form = new FormData();
    form.append('fileImg', files[0])

    this.globalVariablesService.showOptionsWindow = false;
    this.popupText = 'Uploading';
    this.uploading = true;

    this.userService.uploadImage(form, this.authService.userInfo.id, "no-folder").subscribe((resp:any)=>{

      this.globalVariablesService.userFiles.push(resp.fileDB);

      this.uploading = false;
      console.log(resp.error)

      Swal.fire({ 
        icon: 'success',
        title: 'the file has been uploaded successfully',
      })

    }, (err)=>{

      this.uploading = false;
      console.log(err.error)

      Swal.fire({
        icon: 'error',
        title: 'the file has not been uploaded',
      })

    })
  }
}
