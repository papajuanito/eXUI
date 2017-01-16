import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";

import { MenuComponent } from "./components/menu.component";

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
  	AppComponent,
  	MenuComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
