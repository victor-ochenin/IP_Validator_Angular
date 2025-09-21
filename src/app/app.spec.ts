import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render reactive mode header', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Реактивный режим');
  });

  describe('IP validation (reactive)', () => {
    it('validates IPv4 correctly', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;

      app.reactiveIPv4Value = '127.0.0.1';
      expect(app.isReactiveIPv4Valid).toBeTrue();

      app.reactiveIPv4Value = '255.255.255.255';
      expect(app.isReactiveIPv4Valid).toBeTrue();

      app.reactiveIPv4Value = '0.0.0.0';
      expect(app.isReactiveIPv4Valid).toBeTrue();

      app.reactiveIPv4Value = '256.0.0.1';
      expect(app.isReactiveIPv4Valid).toBeFalse();

      app.reactiveIPv4Value = '1.2.3';
      expect(app.isReactiveIPv4Valid).toBeFalse();

      app.reactiveIPv4Value = '01.2.3.4';
      expect(app.isReactiveIPv4Valid).toBeFalse();
    });

    it('validates IPv6 correctly', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;

      app.reactiveIPv6Value = '::';
      expect(app.isReactiveIPv6Valid).toBeTrue();

      app.reactiveIPv6Value = '::1';
      expect(app.isReactiveIPv6Valid).toBeTrue();

      app.reactiveIPv6Value = '2001:db8::1';
      expect(app.isReactiveIPv6Valid).toBeTrue();


      app.reactiveIPv6Value = '::ffff:192.168.0.1';
      expect(app.isReactiveIPv6Valid).toBeTrue();

      app.reactiveIPv6Value = '1';
      expect(app.isReactiveIPv6Valid).toBeFalse();

      app.reactiveIPv6Value = 'gggg::1';
      expect(app.isReactiveIPv6Valid).toBeFalse();

    });
  });

  describe('IP validation (plain API)', () => {
    it('checkIPv4 sets flags and last value', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;

      app.checkIPv4('192.168.1.10');
      expect(app.isPlainIPv4Valid).toBeTrue();
      expect(app.lastCheckedIPv4Value).toBe('192.168.1.10');

      app.checkIPv4('192.168.1');
      expect(app.isPlainIPv4Valid).toBeFalse();
      expect(app.lastCheckedIPv4Value).toBe('192.168.1');
    });

    it('checkIPv6 sets flags and last value', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;

      app.checkIPv6('::1');
      expect(app.isPlainIPv6Valid).toBeTrue();
      expect(app.lastCheckedIPv6Value).toBe('::1');

      app.checkIPv6('1');
      expect(app.isPlainIPv6Valid).toBeFalse();
      expect(app.lastCheckedIPv6Value).toBe('1');
    });

    it('resetPlain clears last values and flags', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;

      app.checkIPv4('127.0.0.1');
      app.checkIPv6('::1');
      app.resetPlain();

      expect(app.lastCheckedIPv4Value).toBe('');
      expect(app.lastCheckedIPv6Value).toBe('');
      expect(app.isPlainIPv4Valid).toBeNull();
      expect(app.isPlainIPv6Valid).toBeNull();
    });
  });
});
