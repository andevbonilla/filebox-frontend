import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FileService } from 'src/app/services/file.service';
import { FolderService } from 'src/app/services/folder.service';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showHtml:boolean = false;

  constructor(public globalVariablesService:GlobalVariablesService,
              private folderService:FolderService,
              private authService:AuthService,
              private fileService:FileService) { }

  ngOnInit(): void {
  
    this.fileService.getFiles(this.authService.userInfo.id, 6).subscribe((resp:any)=>{
      this.globalVariablesService.userFiles = resp.filesDB;
    })

    this.folderService.getFolders(this.authService.userInfo.id).subscribe((resp:any)=>{
      this.globalVariablesService.userFolders = resp.foldersDB;
      this.showHtml = true;
    })

   
  }

  openOptionsWindow(){
    this.globalVariablesService.showOptionsWindow = true;
  }

}
