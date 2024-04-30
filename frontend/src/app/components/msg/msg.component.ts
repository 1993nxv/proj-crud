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

  constructor(private msgService: MsgService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.msgService.msgEvent.subscribe((msg: string, estilo: string) => {
      this.openAlert(msg, estilo);
    });
  }

  openAlert(msg: string, estilo: string) {
    this.msg = msg;
    this.updateClass("msg", estilo);
    this.showAlert = true;
  }

  closeAlert() {
    this.showAlert = false;
  }

  updateClass(elementId: string, estilo: string) {
    const element = document.getElementById(elementId);
    if (element) {
      this.renderer.addClass(element, estilo);
    }
  }

}
