import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../types/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[] | null = []

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data
    })
  }

  onDelete(id:string): void{
    this.userService.onDelete(id).subscribe(()=>{
      this.ngOnInit()
    })
  }
}
