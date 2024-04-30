import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MsgService {

  msgEvent: EventEmitter<[string, string]> = new EventEmitter();

  constructor() {}

  openAlert(msg: string, estilo: string) {
    this.msgEvent.emit([msg, estilo]);
  }

}
