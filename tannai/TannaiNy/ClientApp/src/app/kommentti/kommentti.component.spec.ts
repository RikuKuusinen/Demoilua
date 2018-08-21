import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KommenttiComponent } from './kommentti.component';

describe('KommenttiComponent', () => {
  let component: KommenttiComponent;
  let fixture: ComponentFixture<KommenttiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KommenttiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KommenttiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
