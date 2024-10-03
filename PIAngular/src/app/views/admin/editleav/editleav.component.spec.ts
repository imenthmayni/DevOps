import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditleavComponent } from './editleav.component';

describe('EditleavComponent', () => {
  let component: EditleavComponent;
  let fixture: ComponentFixture<EditleavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditleavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditleavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
