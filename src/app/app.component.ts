import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UtilityService } from './core/services/utility.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'employee-frontend';

  constructor(
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.utilityService.setLanguage();
  }

}
