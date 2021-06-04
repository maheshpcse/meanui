import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-forms',
  templateUrl: './add-forms.component.html',
  styleUrls: ['./add-forms.component.css']
})
export class AddFormsComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  onAddAction(view: any) {
    console.log('Select view isss', view);
    if (view === 'beautician') {
      this.router.navigate(['/add-beautician']);
    } else if (view === 'beautyparlour') {
      this.router.navigate(['/add-beauty-parlour']);
    }
  }

}
