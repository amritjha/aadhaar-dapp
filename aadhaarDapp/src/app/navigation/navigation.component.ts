import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  tab_index:Number = 1;

  constructor() { }

  ngOnInit() { }

  onTabSelect(event: any) {
    this.tab_index = parseInt(event.toElement.attributes.idx.value);
  }

}
