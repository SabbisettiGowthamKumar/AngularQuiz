import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDisplayDialogComponent } from './common-display-dialog.component';

describe('CommonDisplayDialogComponent', () => {
  let component: CommonDisplayDialogComponent;
  let fixture: ComponentFixture<CommonDisplayDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonDisplayDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonDisplayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
