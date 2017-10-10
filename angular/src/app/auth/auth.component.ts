import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor () { }

  ngOnInit () {
  }

  onFenixLogin () {
    sessionStorage.setItem('user', '')
    console.log('Login with Fenix performed')
  }

}
