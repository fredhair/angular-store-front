import { AfterViewInit, EventEmitter, Component, ElementRef, OnDestroy, Output, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements AfterViewInit, OnDestroy {

  @ViewChild('searchText', { static: true }) searchText!: ElementRef;
  @Output() textChanged: EventEmitter<string> = new EventEmitter();
  private inputObserver?: Subscription;

  constructor() {
    
  }

  ngAfterViewInit(): void {
    this.inputObserver = fromEvent(this.searchText.nativeElement as HTMLInputElement, 'input')
      .pipe(
        map(e => (e.target as HTMLInputElement).value),
        debounceTime(1000),
        distinctUntilChanged(),
        tap((text: string) => {
          this.textChanged.emit(text.trim());
        })
      ).subscribe();
  }

  ngOnDestroy(): void {
    //Do I need to unsubscribe or will it be done automatically and memory freed
    //when this object is destroyed? Presumably no other references but not 100% sure..
    this.inputObserver?.unsubscribe();
  }
}
