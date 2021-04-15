import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCowComponent } from './create-cow.component';

describe('CreateCowComponent', () => {
  let component: CreateCowComponent;
  let fixture: ComponentFixture<CreateCowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
