import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveToComponent } from './move-to.component';

describe('MoveToComponent', () => {
  let component: MoveToComponent;
  let fixture: ComponentFixture<MoveToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveToComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
