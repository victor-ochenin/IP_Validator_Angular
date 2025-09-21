import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isIPv4 as utilIsIPv4, isIPv6 as utilIsIPv6 } from './ip.utils';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  reactiveIPv4Value: string = '';
  reactiveIPv6Value: string = '';

  lastCheckedIPv4Value = '';
  lastCheckedIPv6Value = '';
  isPlainIPv4Valid: boolean | null = null;
  isPlainIPv6Valid: boolean | null = null;

  get isReactiveIPv4Valid(): boolean {
    return this.isIPv4(this.reactiveIPv4Value.trim());
  }
  get isReactiveIPv6Valid(): boolean {
    return this.isIPv6(this.reactiveIPv6Value.trim());
  }

  checkIPv4(value: string): void {
    const v = (value ?? '').trim();
    this.lastCheckedIPv4Value = v;
    this.isPlainIPv4Valid = this.isIPv4(v);
  }
  checkIPv6(value: string): void {
    const v = (value ?? '').trim();
    this.lastCheckedIPv6Value = v;
    this.isPlainIPv6Valid = this.isIPv6(v);
  }
  resetPlain(): void {
    this.lastCheckedIPv4Value = '';
    this.lastCheckedIPv6Value = '';
    this.isPlainIPv4Valid = null;
    this.isPlainIPv6Valid = null;
  }

  private isIPv4(input: string): boolean {
    return utilIsIPv4(input);
  }

  private isIPv6(input: string): boolean {
    return utilIsIPv6(input);
  }
}
