import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleprojectComponent } from './detailleproject.component';

describe('DetailleprojectComponent', () => {
  let component: DetailleprojectComponent;
  let fixture: ComponentFixture<DetailleprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailleprojectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailleprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
