import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FolderService } from 'src/app/services/folder.service';

@Component({
  selector: 'app-all-folders',
  templateUrl: './all-folders.component.html',
  styleUrls: ['./all-folders.component.css']
})
export class AllFoldersComponent implements OnInit {

  folders:any[]= [];
  showHtml:boolean = false;

  constructor(private folderService:FolderService,
              private authService:AuthService) {
    this.folderService.getFolders(this.authService.userInfo.id).subscribe((resp:any)=>{
      this.folders = resp.foldersDB;
      this.showHtml = true
    })
   }

  ngOnInit(): void {
  }

}
