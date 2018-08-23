import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EhdotusSearchComponent } from './ehdotus-search.component';

describe('EhdotusSearchComponent', () => {
  let component: EhdotusSearchComponent;
  let fixture: ComponentFixture<EhdotusSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EhdotusSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EhdotusSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
