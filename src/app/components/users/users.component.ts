import { Component } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users$ = this.usersService.users$;

  loading$ = this.usersService.loading$;

  constructor(private usersService: UsersService, private userService: UserService) {
    usersService.load();
  }

  delete(user: User) {
    this.userService.delete(user, _ => {
      this.usersService.load();
    });
  }
}