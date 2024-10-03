import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpbylocationComponent } from './opbylocation.component';

describe('OpbylocationComponent', () => {
  let component: OpbylocationComponent;
  let fixture: ComponentFixture<OpbylocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpbylocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpbylocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
