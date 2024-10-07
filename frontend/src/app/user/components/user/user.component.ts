import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { User } from 'src/app/interfaces/user.interfaces'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public totalUsers: number = 0
  public users: User[] = []

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: response => {
        console.log("🚀 ~ UserComponent ~ this.userService.getUsers ~ response:", response)
        this.totalUsers = response.total
        this.users = response.users
      },
      error: error => {
        console.log('Error in getUsers request', error)
      }
    })
  }
}
