import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionDetailsComponent } from './suggestion-details.component';

describe('SuggestionDetailsComponent', () => {
  let component: SuggestionDetailsComponent;
  let fixture: ComponentFixture<SuggestionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
