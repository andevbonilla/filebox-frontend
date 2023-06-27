import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FileService } from 'src/app/services/file.service';
import { FolderService } from 'src/app/services/folder.service';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';
import Swal from 'sweetalert2';

@Component({ 
  selector: 'app-file-info',
  templateUrl: './file-info.component.html',
  styleUrls: ['./file-info.component.css']
})
export class FileInfoComponent implements OnInit {

  menuFile:boolean = false;
  renamePoppup:boolean = false;
  showHtml:boolean = false;

  fileUrlSigned:string = '';
  fileName:string = '';
  isImage:boolean = false;
  isPdf:boolean = false;
  isAudio:boolean = false;
  isVideo:boolean = false;

  @Input()file:any

  constructor(private fileService:FileService,
              public globalVariablesService:GlobalVariablesService) {


                
               }

  ngOnInit(): void {
    this.getNewUrl(this.file.aws_key);
    this.fileName = this.file.name;

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
    

      default: console.log("")
        break;
    }
  }

  openMenuFile(){
    this.menuFile = true;
  }

  closeMenuFile(){
    this.menuFile = false;
  }

  deleteFile(id:any){
    
    this.showHtml = false;

    this.fileService.deleteFile(id).subscribe((resp:any)=>{
 
      const indice = this.globalVariablesService.userFiles.findIndex(file=>file._id === id);
      this.globalVariablesService.userFiles.splice(indice, 1);
      this.showHtml = true;
      
    }, (err)=>{
      this.showHtml = true;
      Swal.fire({
        icon: 'error',
        title: "there was an error so the file could not be deleted",       
      })
    })
  }
 
  renameFile(){
    this.renamePoppup = true;
    this.menuFile = false;
  }

  closeRenamePopup(){
    this.renamePoppup = false;
  }

  uptadeFile(){

    if (this.fileName.length <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'the name must be at least 1 character',
      })
      return;
    }

    this.showHtml = false;

    this.fileService.uptadeFile(this.file._id,this.fileName).subscribe((resp:any)=>{
      this.renamePoppup = false;
      this.file.name = resp.fileUpdated.name;
      this.showHtml = true;

    }, (err)=>{
      this.showHtml = true;
      Swal.fire({
        icon: 'error',
        title: "there was an error so the file could not be updated",       
      })
    })
    
  }

  getNewUrl(aws_key:any){
    this.fileService.getSignedUrl(aws_key).subscribe((resp:any)=>{
      this.fileUrlSigned = resp.url
      this.showHtml = true
    })
  }
  
  moveTo(){
    this.globalVariablesService.fileToMove = this.file._id
    this.globalVariablesService.moveToPopup = true;
  }
}
