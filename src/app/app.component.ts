import { Component } from '@angular/core';
import { GamepadService } from './gamepad.service';

const ipcRenderer = require('electron').ipcRenderer;

@Component({
  moduleId: module.id,
  selector: 'my-app',
  providers: [GamepadService],
  template: `
    <div class="container">
        <menu></menu>
    </div>
  `
})
export class AppComponent {


  constructor(private gamepadService: GamepadService) {

    this.gamepadService.emitter.subscribe((data) => {
      console.log(data);
    });

    ipcRenderer.on("reply", (event, arg) => {
      console.log("Reply was " + arg);
    });
  }

  public text_hello_world: string = "Hello Angular 2.2!";
  public text_small: string = "Greatness awaits..."

  public test(): void {
    console.log("Getestet");
    ipcRenderer.send("message", "tested");
  }

}
