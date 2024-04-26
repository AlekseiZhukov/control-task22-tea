import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {SearchService} from "../../../services/search.service";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchForm = this.fb.group({
    searchTeas: ['']
  });

  constructor(private fb: FormBuilder, private router: Router, private searchService: SearchService) {
  }

  ngOnInit(): void {
  }

  findTeas() {
    console.log(this.searchForm.value);
    if (this.searchForm.controls.searchTeas.value) {
      this.searchService.setSearchString(this.searchForm.controls.searchTeas.value);
    } else {
      this.searchService.clearSearchString();
    }

    this.router.navigate(['/products'])
  }

  clearSearchString() {
    this.searchForm.controls.searchTeas.setValue('') ;
    this.searchService.clearSearchString()
  }

}
