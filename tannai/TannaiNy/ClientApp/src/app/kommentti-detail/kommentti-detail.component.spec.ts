import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KommenttiDetailComponent } from './kommentti-detail.component';

describe('KommenttiDetailComponent', () => {
  let component: KommenttiDetailComponent;
  let fixture: ComponentFixture<KommenttiDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KommenttiDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KommenttiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
