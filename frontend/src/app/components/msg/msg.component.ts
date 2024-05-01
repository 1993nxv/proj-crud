import { Component, OnInit, Renderer2 } from '@angular/core';
import { MsgService } from './msg.service';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.css'],
  animations: [
    trigger('slideInFromTop', [
      transition('void => *', [
        style({
          transform: 'translateY(-100%)',
          opacity: 0
        }),
        animate('0.5s ease-out')
      ])
    ])
  ]
})
export class MsgComponent implements OnInit {

  showAlert: boolean = false;
  msg: string = '';
  estilo: string = '';

  constructor(private msgService: MsgService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.msgService.msgEvent.subscribe((msg: string[]) => {
      this.msg = msg[0];
      this.estilo = msg[1];
      this.openAlert();
    });
  }

  openAlert() {
    this.showAlert = true;
    
    setTimeout(() => {
      this.closeAlert();
    }, 3000);

  }

  closeAlert() {
    this.showAlert = false;
  }

}
