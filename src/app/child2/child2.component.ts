import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-child2',
  templateUrl: './child2.component.html',
  styleUrls: ['./child2.component.css']
})

// This example is meant to demonstrate reattaching and detaching of the Change Detector Ref. 
// This allows us to explicitly attach or detach the view from the tree
export class Child2Component implements OnInit {
  @Input() notifier$!: BehaviorSubject<boolean>;
  @Input() count!:number;

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // The count will continue to increment no matter what. However, the view will stop updating if we detach
    // and will update if we reattach
    this.notifier$.subscribe(res => {
      if (res) {
        this.cd.reattach();
      } else {
        this.cd.detach();
      }
    });
  }

}
