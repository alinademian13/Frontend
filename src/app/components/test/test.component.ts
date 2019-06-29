import { Component, OnInit } from "@angular/core";
import { NavbarService } from '../../services/navbar.service';

@Component({
    selector: 'test-list',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {


  constructor(private navbar: NavbarService) {
  }

  ngOnInit(): void {
    this.navbar.show();

  }

}
