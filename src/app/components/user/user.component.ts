import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { RefDataService } from '../../services/ref-data.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  user$ = this.userService.user$;

  loading$ = this.userService.loading$;

  saving$ = this.userService.saving$;

  error$ = this.userService.error$;

  titles$ = this.refDataService.titles$;

  constructor(
    private userService: UserService,
    private refDataService: RefDataService,
    private router: Router,
    route: ActivatedRoute
  ) {
    const id = route.snapshot.paramMap.get('id');
    userService.load(parseInt(id));
  }

  save(user: User) {
    this.userService.save(user, _ => {
      this.router.navigate(['/users']);
    });
  }
}