import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{

  ngOnInit(): void {   
  }
  constructor(public ds:DataService){ }


  getAuthorBooks(input:string){
    this.ds.searchBook(input,'author')
  }

  

}
