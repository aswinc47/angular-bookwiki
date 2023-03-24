import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  ngOnInit(): void {
    this.ds.clearSuggestions()
  }

  constructor(public ds:DataService){}

  search(input:string,searchType:boolean){
    let typeString:string = ""
    if(searchType){
      typeString = "title"
    }else{
      typeString = "author"
    }
    this.ds.searchBook(input,typeString)
  }

  changeSearch(){
    this.ds.changeSearch()
  }


  getSuggestions(input:string){
    this.ds.getSuggestions(input)
  }

}
