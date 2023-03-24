import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit{
  ngOnInit(): void {
  }

  constructor(public ds:DataService){ }


  getBook(key:string,author:string,publisher:string,firstPublished:string){
    console.log(key,author,publisher,firstPublished)
    this.ds.getBook(key,author,publisher,firstPublished)
  }

  getAuthorBooks(input:string){
    this.ds.searchBook(input,'author')
  }

}
