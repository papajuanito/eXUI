import { Component } from '@angular/core';
import { GamepadService } from '../gamepad.service';

@Component({
	selector: 'menu',
	providers: [GamepadService],
	template: `
		<ul>
			<li [style.marginLeft]="margin">icon</li>
			<li>icon</li>
			<li>icon</li>
			<li>icon</li>
			<li>icon</li>
			<li>icon</li>
			<li>icon</li>
			<li>icon</li>
			<li>icon</li>
			<li>icon</li>
			<li>icon</li>
			<li>icon</li>
			<li>icon</li>
			<li>icon</li>
			<li>icon</li>
			<li>icon</li>
			<li>icon</li>
			<li>icon</li>
			<li>icon</li>
			<li>icon</li>
			<li>icon</li>
		</ul>
		<button (click)="test();">Test</button>
	`,
	styles: [`
		ul {
			list-style: none;
		    overflow: hidden;
		    width: 5000%;
		    padding: 0;
		    margin: 0;
		}

		ul li {
			display: inline-block;
		    font-size: 20px;
		    font-weight: bold;
		    text-transform: uppercase;
		    font-family: helvetica;
		    padding: 20px;
		    border: 1px solid;
		    transition: all 0.5s ease;
		}
	`]
})
export class MenuComponent {

	margin: number = 0;

	constructor(private gamepadService: GamepadService) {
		this.gamepadService.emitter.subscribe((data) => {
			console.log(data);

			if (data.buttonIndex === 15) {
				console.log('here', 'right');
				this.margin = this.margin - 92;
			} else if (data.buttonIndex === 14) {
				console.log('here', 'left');
				this.margin = this.margin + 92;
			}
	    });
	}

	test() {
		this.margin = this.margin - 92;		
		console.log('testing', this.margin);
	}
}