import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarDhComponent } from './nav-bar-dh.component';

describe('NavBarDhComponent', () => {
  let component: NavBarDhComponent;
  let fixture: ComponentFixture<NavBarDhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarDhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarDhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
