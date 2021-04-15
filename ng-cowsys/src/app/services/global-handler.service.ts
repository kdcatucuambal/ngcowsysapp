import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class GlobalHandlerService {


  private message: Message;

  constructor() {
    this.message = {
      summary: "",
      severity: "",
      detail: "",
      icon: ""
    };
  }


  public set _message(m: Message) {
    this.message = m;
  }


  public get _message(): Message {
    return this.message;
  }


}
