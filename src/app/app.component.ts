import { Component, OnInit } from '@angular/core';
import { User } from './types/user-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: User[] = [
    {
      firstName: 'Tony',
      lastName: 'Stark',
      age: 45,
      hobby: 'Building suits'
    },
    {
      firstName: 'John',
      lastName: 'Wick',
      age: 55,
      hobby: 'Making pencils disappear'
    },
    {
      firstName: 'Peter',
      lastName: 'Griffin',
      age: 40,
      hobby: 'Fighting chickens'
    }
  ];

  onHobbyChangeFromParent(): void {
    // This will work fine if the Change Detection Strategy for the child is set to the DEFAULT strategy.
    // However, if it's set to onPush, it will not work because Angular has not detected
    // a new input object and therefore won't update the view. It requires us to use immutable objects.
    // this.users[0].hobby = 'Hobby has been changed from inside the parent component';
    
    // Must use this form of modification below if using onPush strategy in child component:
    const newUser = { ...this.users[0] };
    newUser.hobby = 'Hobby has been changed from inside the parent component';
    this.users[0] = newUser;
  }
}
