import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaTutoresComponent } from './alta-tutores.component';

describe('AltaTutoresComponent', () => {
  let component: AltaTutoresComponent;
  let fixture: ComponentFixture<AltaTutoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaTutoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaTutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
