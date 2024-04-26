import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
  public searchString$: Subject<string | null> = new Subject();
  public searchString: string = '';

  setSearchString(searchString: string) {
    this.searchString = searchString;
    this.searchString$.next(this.searchString);
  }

  clearSearchString() {
    this.searchString = '';
    this.searchString$.next(this.searchString);
  }
}
