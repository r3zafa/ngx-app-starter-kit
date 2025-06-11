import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentListItemComponent } from './content-list-item.component';

describe('ContentListItemComponent', () => {
  let component: ContentListItemComponent;
  let fixture: ComponentFixture<ContentListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
