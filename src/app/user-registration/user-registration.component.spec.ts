import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRegistrationComponent } from './user-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { UserService } from './services/UserService';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['registerUser']);

    await TestBed.configureTestingModule({
      imports: [ 
        UserRegistrationComponent, 
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule
      ],
      providers: [
        { provide: UserService, useValue: spy }
      ]
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Validation', () => {
    it('should invalidate the form when empty', () => {
      expect(component.registrationForm.valid).toBeFalsy();
    });

    it('should validate the form when all fields are filled correctly', () => {
      component.registrationForm.patchValue({
        username: 'testuser',
        password: 'password123'
      });
      expect(component.registrationForm.valid).toBeTruthy();
    });
  });

  describe('User Registration', () => {
    it('should call registerUser method of UserService on form submission', () => {
      userServiceSpy.registerUser.and.returnValue(of({}));
      component.registrationForm.patchValue({
        username: 'testuser',
        password: 'password123'
      });
      component.onSubmit();
      expect(userServiceSpy.registerUser).toHaveBeenCalled();
    });

    it('should handle registration error', () => {
      userServiceSpy.registerUser.and.returnValue(throwError(() => new Error('Registration failed')));
      component.registrationForm.patchValue({
        username: 'testuser',
        password: 'password123'
      });
      component.onSubmit();
    });
  });
});