import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EhdotusLisatiedotComponent } from './ehdotus-lisatiedot.component';

describe('EhdotusLisatiedotComponent', () => {
  let component: EhdotusLisatiedotComponent;
  let fixture: ComponentFixture<EhdotusLisatiedotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EhdotusLisatiedotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EhdotusLisatiedotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
