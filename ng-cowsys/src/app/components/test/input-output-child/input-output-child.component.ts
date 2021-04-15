import { Component, EventEmitter, Host, Input, OnInit, Output } from '@angular/core';
import { InputOutputComponent } from '../input-output/input-output.component';

@Component({
  selector: 'app-input-output-child',
  templateUrl: './input-output-child.component.html',
  styleUrls: ['./input-output-child.component.css']
})
export class InputOutputChildComponent implements OnInit {


  @Input("data") user: any;

  @Output('deleteEdit') delete = new EventEmitter<number>();

  constructor(
    @Host() private _app: InputOutputComponent
  ) { }



  ngOnInit(): void {
   
  }

  deleteUser(id: number) {
    this.delete.emit(id);
  }

  deleteUserHost(id: number) {
    this._app.users = this._app.users.filter(user => user.id != id)
  }

}
