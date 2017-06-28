import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeDisplayComponent } from './joke-display.component';

describe('JokeDisplayComponent', () => {
  let component: JokeDisplayComponent;
  let fixture: ComponentFixture<JokeDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JokeDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
