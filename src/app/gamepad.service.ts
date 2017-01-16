import { Injectable, Renderer } from '@angular/core';
import { ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class GamepadService {

	emitter: ReplaySubject<any> = new ReplaySubject(1);

	private gamepads: Gamepad[] = [];

	//Object that contains buttons pressed
	private gamepadButtonEvents: any = {};

	constructor(renderer: Renderer) {
		console.log(this);
		//we push a new controller into the list
		renderer.listenGlobal('window', 'gamepadconnected', (event: GamepadEvent) => {
			this.addGamepad(event.gamepad);
		});

		renderer.listenGlobal('window', 'gamepaddisconnected', (event: GamepadEvent) => {
			this.removeGamepad(event.gamepad);
		});

		renderer.listenGlobal('window', 'gamepadbuttondown', (event: GamepadEvent) => {
			console.log(event);
		}); 

	}

	private addGamepad(gamepad: Gamepad) {		
		this.gamepads[gamepad.index] = gamepad;
		console.log('added a controller', this.gamepads);
		this.gamepadUpdate();
	}

	private removeGamepad(gamepad: Gamepad) {
		delete this.gamepads[gamepad.index];
		console.log('removed a controller', this.gamepads);
	}

	private gamepadUpdate() {
		let gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
		
		for (let i = 0; i < gamepads.length; i++) {
			if (gamepads[i]) {
				if (gamepads[i].index in this.gamepads) {
					this.gamepads[gamepads[i].index] = gamepads[i];
				} else {
					this.addGamepad(gamepads[i]);
				}
			}
		}

		for (let gamepad of this.gamepads) {
			gamepad.buttons.forEach((button, index) => {
				if (button.pressed) {

					if (!this.gamepadButtonEvents[gamepad.index]) {
						this.gamepadButtonEvents[gamepad.index] = {};						
					}

					this.gamepadButtonEvents[gamepad.index][index] = true;

				} else if (typeof this.gamepadButtonEvents[gamepad.index] !== 'undefined' && 
					typeof this.gamepadButtonEvents[gamepad.index][index] !== 'undefined' &&
					this.gamepadButtonEvents[gamepad.index][index]) {

					//We can now track a button press

					this.gamepadButtonEvents[gamepad.index][index] = false;
					console.log('WE GOT A RELEASE');
					console.log(this.gamepadButtonEvents);
					
					this.emitter.next({
						buttonIndex: index
					});
				}
			});
		}

		requestAnimationFrame(() => this.gamepadUpdate());
	}

}