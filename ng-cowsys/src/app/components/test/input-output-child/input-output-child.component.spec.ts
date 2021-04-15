import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOutputChildComponent } from './input-output-child.component';

describe('InputOutputChildComponent', () => {
  let component: InputOutputChildComponent;
  let fixture: ComponentFixture<InputOutputChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputOutputChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputOutputChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
