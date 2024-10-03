import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheprojectComponent } from './afficheproject.component';

describe('AfficheprojectComponent', () => {
  let component: AfficheprojectComponent;
  let fixture: ComponentFixture<AfficheprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficheprojectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficheprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
