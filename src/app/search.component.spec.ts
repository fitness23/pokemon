import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { HttpService } from "./services/http.service";
import { Observable, map, of, tap } from 'rxjs';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      declarations: [SearchComponent],
      providers: [
        HttpService]
    }).compileComponents();
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
  });

  it('should create the component successfully', () => {
    expect(component).toBeTruthy();
  });

  it('should have the createform method existing, just in case someone might have tried to delete it', () => {
    expect(component.createForm).toBeDefined()
  });

  it('should have the getData method existing, just in case someone might have tried to delete it', () => {
    expect(component.getData).toBeDefined()
  });

  it('should have the setSearchUrl method existing, just in case someone might have tried to delete it', () => {
    expect(component.setSearchUrl).toBeDefined()
  });

  it('should have the populateFilterLists method existing, just in case someone might have tried to delete it', () => {
    expect(component.populateFilterLists).toBeDefined()
  });

  it('should have the viewPokemon method existing, just in case someone might have tried to delete it', () => {
    expect(component.viewPokemon).toBeDefined()
  });

  it('should activate the method when pretending to click the button on the html', fakeAsync(() => {

    spyOn(component, "viewPokemon")

    component.items$=of([{"slot": 1, "pokemon": {"name": "my test name pokemon", "url": "a url"}}]);
    fixture.detectChanges();

    let buttonElement = fixture.debugElement.query(By.css('.viewPokemon'))
    buttonElement.triggerEventHandler('click', null)

    fixture.detectChanges()

    fixture.whenStable().then(() => {
        expect(component.viewPokemon).toHaveBeenCalled();
    });



  }));





    

}); 