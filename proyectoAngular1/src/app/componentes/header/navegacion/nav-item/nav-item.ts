import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { NavSubItem } from '../nav-sub-item/nav-sub-item';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-nav-item',
  imports: [RouterLink, RouterModule, NavSubItem, CommonModule],
  templateUrl: './nav-item.html',
  styleUrls: ['./nav-item.css'],
})
export class NavItem implements OnInit {
  @Input() navItem?: any;
  protected tieneDesplegable: boolean = false;
  protected isHovered: boolean = false;

  ngOnInit(): void {
    console.log(this.navItem);
    if (this.navItem?.submenu?.length > 0) {
      this.tieneDesplegable = true;
    }
  }
}
