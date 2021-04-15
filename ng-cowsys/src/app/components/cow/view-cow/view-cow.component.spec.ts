import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCowComponent } from './view-cow.component';

describe('ViewCowComponent', () => {
  let component: ViewCowComponent;
  let fixture: ComponentFixture<ViewCowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
