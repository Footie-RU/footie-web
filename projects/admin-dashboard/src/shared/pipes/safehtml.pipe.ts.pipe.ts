import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  /**
   * Transform the input value to safe HTML
   * @param value - The input value
   * @returns The safe HTML
   * @example {{ value | safeHtml }}
   * @example <div [innerHTML]="value | safeHtml"></div>
   * @example <div *ngIf="value | safeHtml"></div>
   */
  transform(value: any): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
