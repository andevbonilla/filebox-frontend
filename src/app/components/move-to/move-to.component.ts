import { Component,Input,OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FolderService } from 'src/app/services/folder.service';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-move-to',
  templateUrl: './move-to.component.html',
  styleUrls: ['./move-to.component.css']
})
export class MoveToComponent implements OnInit {

  formFolders:any;
  
  foldersSelected:any[] =[];
  selected:boolean = false;
  uploading:boolean = false


  constructor(public globalVariablesService:GlobalVariablesService,
              private folderService:FolderService,
              private fb:FormBuilder) { 

                               
              }

  ngOnInit(): void {


    this.formFolders = this.fb.group({
      selectedFolders: this.fb.array([])
    });
    
  }

  closeMoveToPopup(){
    this.globalVariablesService.moveToPopup = false;
  }

  onChange(id:string, isChecked:any){

    isChecked = isChecked.target.checked

    const folderFormArray = <FormArray>this.formFolders.controls.selectedFolders;

    if(isChecked) {
      folderFormArray.push(new FormControl(id));
    } else {
      let index = folderFormArray.controls.findIndex(f => f.value == id)
      folderFormArray.removeAt(index);
    }

  }

  submit(){

    if (this.formFolders.value.selectedFolders.length === 0) {
      return;
    }

    this.uploading = true
    this.folderService.addFileToFolder(this.globalVariablesService.fileToMove,this.formFolders.value.selectedFolders).subscribe(resp=>{
      
      this.uploading = false;
      this.globalVariablesService.moveToPopup = false;
      Swal.fire({ 
        icon: 'success',
        title: 'the file has been added successfully',
      })

    }, (err)=>{

      this.uploading = false
      Swal.fire({
        icon: 'error',
        title: "there was an error, please try again later",
      })

    })
    
  }
}
