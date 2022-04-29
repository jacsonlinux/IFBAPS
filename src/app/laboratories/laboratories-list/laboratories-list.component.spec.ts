import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoriesListComponent } from './laboratories-list.component';

describe('LaboratoriesListComponent', () => {
  let component: LaboratoriesListComponent;
  let fixture: ComponentFixture<LaboratoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoriesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
