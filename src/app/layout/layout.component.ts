import { Component, OnChanges } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnChanges{
  isLogued : boolean = false;
  constructor(private authService : AuthService){
    this.isLogued = this.authService.isLoggedIn();
    console.log("esta logueado", this.isLogued);
  }

  ngOnChanges() : void {
    this.isLogued = this.authService.isLoggedIn();
    console.log("esta logueado", this.isLogued);
    
  }


}
