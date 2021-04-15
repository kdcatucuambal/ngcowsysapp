import { Component, OnInit } from '@angular/core';
import { UserRegister } from 'src/app/models/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  displayBasic: boolean;
  user: UserRegister;

  constructor() { 
  }

  ngOnInit(): void { 
   
  }

  showBasicDialog() {
    this.displayBasic = true;
  }


}
