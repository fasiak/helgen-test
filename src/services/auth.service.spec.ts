import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

describe('AuthService', () => {
	let service: AuthService;
	let httpMock: HttpTestingController;
	let cookiesService: CookieService;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
		});
		service = TestBed.inject(AuthService);
		httpMock = TestBed.inject(HttpTestingController);
		cookiesService = TestBed.inject(CookieService);
	});

	afterEach(() => {
		httpMock.verify();
	});


	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	// xit('should send a POST request to the login endpoint with the user data', () => {
	// 	const user = { username: 'testuser', password: 'testpassword' };
	// 	const expectedResponse = { token: 'testtoken' };

	// 	service.login(user).subscribe(data => {
	// 		expect(data).toEqual(expectedResponse);
	// 	});

	// 	const request = httpMock.expectOne('http://localhost:6868/api/user/login');
	// 	expect(request.request.method).toBe('POST');
	// 	expect(request.request.body).toEqual(user);
	// 	request.flush(expectedResponse);
	// });

	it('should set the isLogedIn cookie to 1', () => {
		service.setToken();
		expect(cookiesService.get('isLogedIn')).toBe('1');
	});

	it('should call cookiesService.delete on logout', () => {
		const spy = spyOn(cookiesService, 'delete')
		service.logout();
		expect(spy).toHaveBeenCalled()
	});
	
	
	it('should call cookiesService.get on logout', () => {
		const spy = spyOn(cookiesService, 'get')
		service.getToken();
		expect(spy).toHaveBeenCalled()
	});
	
	it('should get the token' , () => {
		service.setToken();
		const token = service.isSignedIn();
		expect(token).toBe(true);
	});



});
