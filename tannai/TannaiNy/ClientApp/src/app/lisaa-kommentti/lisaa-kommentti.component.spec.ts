import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LisaaKommenttiComponent } from './lisaa-kommentti.component';

describe('LisaaKommenttiComponent', () => {
  let component: LisaaKommenttiComponent;
  let fixture: ComponentFixture<LisaaKommenttiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LisaaKommenttiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LisaaKommenttiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
