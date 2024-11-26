/// <reference types="cypress" />
import LoginPage from "../pom/login/login.cy";

describe('OrangeHRM Login Page Tests', () => {
  const validUsername = 'Admin';
  const validPassword = 'admin123';
  const invalidUsername = 'InvalidUser ';
  const invalidPassword = 'invalidPassword';

beforeEach(() => {
  // Kunjungi halaman login sebelum setiap pengujian
  LoginPage.visit();
});

context('UI Elements Validation', () => {
  it('should display the login page correctly', () => {
    LoginPage.verifyLogoVisible();
    LoginPage.verifyUsernameFieldVisible();
    LoginPage.verifyPasswordFieldVisible();
    LoginPage.verifyLoginButtonVisible();
  });

  it('should mask the password field', () => {
    LoginPage.verifyPasswordFieldMasked();
  });

  it('should navigate to the Forgot Password page when the link is clicked', () => {
    LoginPage.navigateToForgotPassword();
    LoginPage.verifyForgotPasswordPage();
  });
});

context('Login Functionality Tests', () => {
  it('should successfully login with valid credentials', () => {
    LoginPage.enterUsername(validUsername);
    LoginPage.enterPassword(validPassword);
    LoginPage.submit();
    // Verifikasi login berhasil
    cy.url().should('include', '/dashboard/index'); // URL berubah ke dashboard
    LoginPage.verifyDashboardTitle('Dashboard'); // Teks Dashboard muncul
  });

  it('should show error with invalid credentials', () => {
    LoginPage.enterUsername(invalidUsername);
    LoginPage.enterPassword(invalidPassword);
    LoginPage.submit();
    // Verifikasi pesan error muncul
    LoginPage.verifyLoginError('Invalid credentials');
  });

  it('should show error for invalid username and valid password', () => {
    LoginPage.enterUsername(invalidUsername);
    LoginPage.enterPassword(validPassword);
    LoginPage.submit();
    // Verifikasi pesan error muncul
    LoginPage.verifyLoginError('Invalid credentials');
  });

  it('should show validation error for empty username', () => {
    LoginPage.enterPassword(validPassword);
    LoginPage.submit();
    // Verifikasi pesan validasi
    LoginPage.verifyRequiredMessage(0); // Validasi username
  });

  it('should show validation errors for empty fields', () => {
    LoginPage.submit();
    // Verifikasi pesan validasi username
    LoginPage.verifyRequiredMessage(0); // Verifikasi pesan validasi password
    LoginPage.verifyRequiredMessage(1);
  });
});

context('Network Request Tests', () => {
  it('should verify the target page of OrangeHRM, Inc.', () => {
    cy.request('https://www.orangehrm.com/').its('status').should('eq', 200); // Pastikan halaman dapat diakses
  });

  it('Test Web Automation using Intercept', () => {
    LoginPage.enterUsername(validUsername);
    LoginPage.enterPassword(validPassword);
    cy.intercept('GET', '**/action-summary').as('actionSummary');
    LoginPage.submit();
    cy.wait('@actionSummary').its('response.statusCode').should('eq', 200); // Verifikasi status kode respons
  });
  context('Responsive Design Tests', () => {
    const viewports = [
        { name: 'mobile', width: 375, height: 667 },
        { name: 'tablet', width: 768, height: 1024 },
        { name: 'desktop', width: 1280, height: 800 },
    ];

    viewports.forEach((viewport) => {
        it(`should display the login page correctly on ${viewport.name}`, () => {
            cy.viewport(viewport.width, viewport.height);
            LoginPage.visit();
            LoginPage.verifyLogoVisible();
            LoginPage.verifyUsernameFieldVisible();
            LoginPage.verifyPasswordFieldVisible();
            LoginPage.verifyLoginButtonVisible();
        });
    });
});
});
});