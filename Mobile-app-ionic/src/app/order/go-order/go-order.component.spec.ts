import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoOrderComponent } from './go-order.component';

describe('GoOrderComponent', () => {
  let component: GoOrderComponent;
  let fixture: ComponentFixture<GoOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
