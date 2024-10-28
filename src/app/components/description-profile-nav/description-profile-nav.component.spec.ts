import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionProfileNavComponent } from './description-profile-nav.component';

describe('DescriptionProfileNavComponent', () => {
  let component: DescriptionProfileNavComponent;
  let fixture: ComponentFixture<DescriptionProfileNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionProfileNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescriptionProfileNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
