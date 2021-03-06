import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vue-component',
  templateUrl: './vue-component.component.html',
  styleUrls: ['./vue-component.component.css'],
})
export class VueComponentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // import('VueAppRemote/mountAbout').then((mountHeader) => {
    //   console.log('Mounting!!!! ', mountHeader);
    //   mountHeader.default('#about');
    // });
    import('VueAppRemote/mountApp').then((mountApp) => {
      console.log('Mounting!!!! ', mountApp);
      mountApp.default('#myvueapp');
    });
  }
}
