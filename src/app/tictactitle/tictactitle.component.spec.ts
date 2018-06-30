import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TictactitleComponent } from './tictactitle.component';

describe('TictactitleComponent', () => {
  let component: TictactitleComponent;
  let fixture: ComponentFixture<TictactitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TictactitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TictactitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
