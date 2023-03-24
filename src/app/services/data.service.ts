import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Bookdetails, Cards } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  constructor(public router:Router) { }

  public searchResults: Cards[] = []
  public details: Bookdetails = { }
  public searchType = true
  public suggestions!: string[];

  searchBook(input:string,searchType:string): void{
    fetch(`https://openlibrary.org/search.json?${searchType}=${input}&limit=75`).then(response => response.json()).then(result=>{
      this.searchResults = []
      for(let i=0;i<result.docs.length;i++){
        
          if(result.docs[i].cover_i){
            let book:Cards = {
              key: result.docs[i].key,
              imgUrl: `https://covers.openlibrary.org/b/id/${result.docs[i].cover_i}-M.jpg`,
              title: result.docs[i].title.slice(0,40),
              author: result.docs[i].author_name?result.docs[i].author_name.slice(0,2):"Not available",
              firstPublishDate: result.docs[i].first_publish_year,
              totalEditions: result.docs[i].edition_count,
              publisher: result.docs[i].publisher?.[0]
            }
            this.searchResults.push(book)
          }
        this.searchResults = this.searchResults.slice(0,20)
      }
      this.router.navigateByUrl('/search')
      console.log(this.searchResults);
      
  }
  )
  }

  changeSearch(){
    this.searchType = !this.searchType
  }

  getBook(key:string,author:string,publisher:string,firstPublished:string){
    this.details = {}
    fetch(`https://openlibrary.org${key}.json`).then(response => response.json()).then(result=>{
      this.details.key = result.key
      this.details.title = result.title
      this.details.imgUrl = `https://covers.openlibrary.org/b/id/${result.covers?.[0]}-L.jpg`
      this.details.subjectPlaces=result.subject_places?result.subject_places.slice(0,5):"No subject place available" 
      this.details.subjectPeople=result.subject_people?result.subject_people.slice(0,5):"No subject people available"
      this.details.subjectTime = result.subject_times?result.subject_times.slice(0,5):"No subject time available"
      this.details.subjects = result.subjects?result.subjects.slice(0,10):"No subject available"
      this.details.description= result.description?(result.description.value?result.description.value.slice(0,400):result.description.slice(0,400)):"No description found"
      this.details.author = author
      this.details.firstPublishDate = firstPublished
      this.details.publisher = publisher

      console.log(this.details)

      this.router.navigateByUrl('/details')
    }
    )
  }



  getSuggestions(book:string):any{
    this.suggestions = []
    fetch(`https://openlibrary.org/search.json?q=${book}&fields=title,cover_i,availability&limit=15`).then(response => response.json()).then(result=>{
      
      for(let i=0;i<result.docs.length;i++){
        if(result.docs[i].cover_i){
          this.suggestions.push(result.docs[i].title.slice(0,25))
        }
        this.suggestions = this.suggestions.slice(0,5)
      }
    })
  }

  clearSuggestions(){
    this.suggestions = []
  }

}
