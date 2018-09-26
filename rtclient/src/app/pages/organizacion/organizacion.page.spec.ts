import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizacionPage } from './organizacion.page';

describe('OrganizacionPage', () => {
  let component: OrganizacionPage;
  let fixture: ComponentFixture<OrganizacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizacionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
