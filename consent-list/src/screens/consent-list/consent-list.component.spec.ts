import { TestBed } from '@angular/core/testing';
import { ConsentListComponent } from './consent-list.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [ConsentListComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ConsentListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'consent-list'`, () => {
    const fixture = TestBed.createComponent(ConsentListComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('consent-list');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(ConsentListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('consent-list app is running!');
  });
});
