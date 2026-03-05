import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-nav-item',
  imports: [RouterLink, RouterModule],
  templateUrl: './nav-item.html',
  styleUrls: ['./nav-item.css'],
})
export class NavItem implements OnInit {
  @Input() navItem?: any;

  ngOnInit(): void {
    console.log(this.navItem);
  }

}
