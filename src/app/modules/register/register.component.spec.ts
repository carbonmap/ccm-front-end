import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(RegisterComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'CCM-front-end'`, async(() => {
    const fixture = TestBed.createComponent(RegisterComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('CCM-front-end');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(RegisterComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('CCM-Front-End');
  }));
});
