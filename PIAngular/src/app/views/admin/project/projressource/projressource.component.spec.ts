import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjressourceComponent } from './projressource.component';

describe('ProjressourceComponent', () => {
  let component: ProjressourceComponent;
  let fixture: ComponentFixture<ProjressourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjressourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjressourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
