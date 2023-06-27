import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  files:any[] = [];
  folders:any[] = [];
  showHtml:boolean = false;

  constructor(private searchService:SearchService,
              private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {

    this.activatedRoute.queryParamMap.subscribe((param:any)=>{
      this.searchService.searchFilesFolders(param.params.q).subscribe((resp:any)=>{
    
        this.files = resp.fileResults;
        this.folders = resp.folderResults;
        this.showHtml = true

      })
    })
  
  }


}
