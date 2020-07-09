import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/Service/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public openDashboard: boolean = false;
  public ShowTabName: string = "AccountInfor";
  
  constructor(
    private _SharedDataService: SharedDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ToggleDashboard() {
    this.openDashboard = !this.openDashboard;
  }

  Logout() {
    sessionStorage.removeItem('LoggedInUser');
    this._SharedDataService.AssignUser([]);
    this.router.navigate(['/home/fashion']);
  }
}
