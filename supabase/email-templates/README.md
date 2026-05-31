# Supabase Auth Email Templates

Use these templates in the Supabase dashboard so customer auth emails match the Intimate Hygiene brand.

## Confirm Signup

1. Open Supabase Dashboard.
2. Go to Authentication > Email Templates > Confirm signup.
3. Set the subject to:

   `Welcome to Intimate Hygiene - confirm your email`

4. Paste the HTML from `confirm-signup.html`.
5. Save the template.

## URL Configuration

In Authentication > URL Configuration, use:

- Site URL: `https://hygenc.lk`
- Redirect URL: `https://hygenc.lk/account`
- Optional local testing redirect: `http://localhost:5173/account`

The app also sends `emailRedirectTo` during signup and password reset. Set `VITE_CUSTOMER_AUTH_REDIRECT_URL` if the live customer account URL changes.
