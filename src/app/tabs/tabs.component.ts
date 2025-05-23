import { Component, OnInit } from '@angular/core';
import { IonTabBar, IonTabButton, IonTabs, IonLabel } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [IonLabel, IonTabBar, IonTabButton, IonTabs, CommonModule, FormsModule, RouterModule
  ]
})

export class TabsComponent implements OnInit {

  constructor() {}

  ngOnInit() {}

}
