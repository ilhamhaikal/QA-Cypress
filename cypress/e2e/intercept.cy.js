describe('OrangeHRM Login Page Tests', () => {
  beforeEach(() => {
    // Kunjungi halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('should display the login page correctly', () => {
    // Periksa elemen halaman login
    cy.get('img[alt="company-branding"]').should('be.visible'); // Logo terlihat
    cy.get('input[name="username"]').should('be.visible'); // Input username terlihat
    cy.get('input[name="password"]').should('be.visible'); // Input password terlihat
    cy.get('button[type="Submit"]').should('be.visible').and('contain', 'Login'); // Tombol login terlihat
  });

  it('should successfully login with valid credentials', () => {
    // Isi username dan password valid
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionsummary');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="Submit"]').click();
    cy.wait('@actionsummary');

    // Verifikasi login berhasil
    cy.url().should('include', '/dashboard/index'); // URL berubah ke dashboard
    cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard'); // Teks Dashboard muncul
  });

  it('should show error with invalid credentials', () => {
    // Isi username dan password tidak valid
    cy.get('input[name="username"]').type('invalidUser');
    cy.get('input[name="password"]').type('invalidPassword');
    cy.get('button[type="submit"]').click();

  
    cy.get('.oxd-alert-content')
      .should('be.visible')
      .and('contain', 'Invalid credentials'); // Verifikasi pesan error
  });

  it('should show error for invalid username and valid password', () => {
    cy.get('input[name="username"]').type('InvalidUser'); // Masukkan username salah
    cy.get('input[name="password"]').type('admin123'); // Masukkan password valid
    cy.get('button[type="submit"]').click(); // Klik tombol login


    cy.get('.oxd-alert-content').should('be.visible').and('contain', 'Invalid credentials');
  });

  it('should show validation error for empty username', () => {
    cy.get('input[name="password"]').type('admin123'); // Masukkan password
    cy.get('button[type="submit"]').click(); // Klik tombol login

    // Verifikasi pesan validasi tanpa request
    cy.get('.oxd-input-group__message').eq(0).should('contain', 'Required'); // Validasi username
  });

  it('should show validation errors for empty fields', () => {
    // Klik tombol login tanpa mengisi form
    cy.get('button[type="submit"]').click();

    // Verifikasi pesan validasi username
    cy.contains('span.oxd-input-group__message', 'Required', { timeout: 2000 }).should('be.visible'); // Pesan validasi username

    // Verifikasi pesan validasi password
    cy.contains('span.oxd-input-group__message', 'Required', { timeout: 2000 }).should('be.visible'); // Pesan validasi password
  });

  it('should mask the password field', () => {
    // Pastikan input password tersamarkan
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });

  it('should navigate to the Forgot Password page when the link is clicked', () => {
    // Klik tombol "Forgot your password?"
    cy.contains('Forgot your password?').click();

    // Verifikasi URL setelah navigasi
    cy.url().should('include', '/auth/requestPasswordResetCode');

    // Verifikasi bahwa halaman "Forgot Password" ditampilkan
    cy.get('h6').should('contain', 'Reset Password'); // Pastikan elemen judul halaman sesuai
  });

  it('should verify the target page of OrangeHRM, Inc.', () => {
    // Intercept halaman eksternal
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index').as('homepageRequest');
    cy.request('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index').its('status').should('eq', 200);

    // cy.wait('@homepageRequest').its('response.statusCode').should('eq', 200);
  });
});
