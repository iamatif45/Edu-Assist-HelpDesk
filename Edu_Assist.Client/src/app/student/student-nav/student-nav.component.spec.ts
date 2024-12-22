import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNavbarComponent } from './student-nav.component';

describe('StudentNavComponent', () => {
  let component: StudentNavbarComponent;
  let fixture: ComponentFixture<StudentNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
