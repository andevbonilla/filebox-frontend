import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {

  showOptionsWindow:boolean = false;
  userFiles:any[] = [];
  userFolders:any[]=[];
  moveToPopup:boolean = false;

  fileToMove:any;
  
  constructor() { }
}
