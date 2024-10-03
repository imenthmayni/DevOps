import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencematchingComponent } from './experiencematching.component';

describe('ExperiencematchingComponent', () => {
  let component: ExperiencematchingComponent;
  let fixture: ComponentFixture<ExperiencematchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperiencematchingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperiencematchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
