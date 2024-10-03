import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectfrontComponent } from './projectfront.component';

describe('ProjectfrontComponent', () => {
  let component: ProjectfrontComponent;
  let fixture: ComponentFixture<ProjectfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectfrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
