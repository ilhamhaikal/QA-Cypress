// cypress/support/pom/LoginPage.js

export default class LoginPage {
    static visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    static enterUsername(username) {
        cy.get('input[name="username"]').type(username);
    }

    static enterPassword(password) {
        cy.get('input[name="password"]').type(password);
    }

    static submit() {
        cy.get('button[type="submit"]').click();
    }

    static verifyLoginError(message) {
        cy.get('.oxd-alert-content').should('be.visible').and('contain', message);
    }

    static verifyDashboardTitle(title) {
        cy.get('.oxd-topbar-header-title').should('contain', title);
    }

    static verifyRequiredMessage(index) {
        cy.get('.oxd-input-group__message').eq(index).should('contain', 'Required');
    }

    static navigateToForgotPassword() {
        cy.contains('Forgot your password?').click();
    }

    static verifyForgotPasswordPage() {
        cy.url().should('include', '/auth/requestPasswordResetCode');
        cy.get('h6').should('contain', 'Reset Password');
    }

    static verifyLogoVisible() {
        cy.get('img[alt="company-branding"]').should('be.visible');
    }

    static verifyUsernameFieldVisible() {
        cy.get('input[name="username"]').should('be.visible');
    }

    static verifyPasswordFieldVisible() {
        cy.get('input[name="password"]').should('be.visible');
    }

    static verifyLoginButtonVisible() {
        cy.get('button[type="submit"]').should('be.visible').and('contain', 'Login');
    }

    static verifyPasswordFieldMasked() {
        cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    }

    static verifyLoginPageTitle() {
        cy.get('h5').contains('Login'); // Menggunakan format yang Anda inginkan
    }
}