import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EhdotusComponent } from './ehdotus.component';

describe('EhdotusComponent', () => {
  let component: EhdotusComponent;
  let fixture: ComponentFixture<EhdotusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EhdotusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EhdotusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
