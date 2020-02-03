import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'full-example';
  user: User = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getIdentity();
  }
}
