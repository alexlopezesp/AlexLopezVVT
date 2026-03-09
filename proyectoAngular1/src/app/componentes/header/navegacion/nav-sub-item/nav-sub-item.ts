import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-nav-sub-item',
  imports: [],
  templateUrl: './nav-sub-item.html',
  styleUrls: ['./nav-sub-item.css'],
})
export class NavSubItem  {
  @Input() subMenu?: any;
}
