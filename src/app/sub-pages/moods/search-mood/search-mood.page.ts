import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { IonSearchbar } from '@ionic/angular';

import { Emoticon, FilterMood } from 'src/app/models/mood.model';
import { Activity } from 'src/app/models/activity.model';

@Component({
  selector: 'app-search-mood',
  templateUrl: './search-mood.page.html',
  styleUrls: ['./search-mood.page.scss'],
})
export class SearchMoodPage implements OnInit {
  @ViewChild('searchBar', { static: true }) searchBar: IonSearchbar;

  private filters: FilterMood= {
    searchText: '',
    emoticon: null,
    parameters: { internal: false, external: false },
    activities: [],
    note: true
  };

  constructor(private router: Router) { }

  ngOnInit() {}

  ionViewDidEnter() {
    /*setTimeout(() => {
      this.searchBar.setFocus();
    }, 500);*/
  }

  onSearchChanged(event) {
    this.filters.searchText= event.target.value;
  }

  onSelectEmoticon(emoticon: Emoticon) {
    this.filters.emoticon= emoticon;
  }

  onText(filter: string) {
    if (filter === 'internal')
      this.filters.parameters.internal= !this.filters.parameters.internal;
    else if (filter === 'external') this.filters.parameters.external= !this.filters.parameters.external;
    else if (filter === 'note') this.filters.note= !this.filters.note;
  }

  onSelectActivities(activities: Activity[]) {
    this.filters.activities= activities;
  }

  onSearch() {
    const navigationExtras: NavigationExtras= {
      state: { ...this.filters }
    };

    this.router.navigate(['/moods/search-results'], navigationExtras);
  }
}
