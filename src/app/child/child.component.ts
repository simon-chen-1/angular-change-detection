import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent implements OnInit {
  @Input() user!: { firstName: string, lastName: string, age: number, hobby: string };
  countObj: {value: number} = {value: 0};
  markForCheckExample: string = '';

  constructor(
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.markForCheckExample = 'Mark for check example should display after 2 seconds';
      // Must use when a view uses the onPush strategy in order to explicitly mark the view as changed 
      // so that it can be checked again.
      this.cd.markForCheck();
    }, 2000);
  }

  announceRender(): void {
    console.log('Child component rendered');
  }

  // This will work and Angular will update the view regardless of the Change Detection Strategy. This 
  // is because since we're updating it from the child component directly/the component receiving the input,
  // Angular compares the new hobby value with the previous hobby value and sees that it has changed.
  onHobbyChangeFromChild(): void {
    this.user.hobby = 'Hobby has been changed from inside the child component';
  }

  // This will also work as normal even though it isn't an input - nothing special here
  increment() {
    this.countObj.value += 1;
  }
}
