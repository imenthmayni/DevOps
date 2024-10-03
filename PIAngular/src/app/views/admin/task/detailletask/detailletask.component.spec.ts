import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailletaskComponent } from './detailletask.component';

describe('DetailletaskComponent', () => {
  let component: DetailletaskComponent;
  let fixture: ComponentFixture<DetailletaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailletaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailletaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
