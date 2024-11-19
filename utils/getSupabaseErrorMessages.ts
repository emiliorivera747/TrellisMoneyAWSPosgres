
export function getSupabaseErrorMessage(errorCode: unknown): string {
    console.log("ERROR CODE",errorCode);
    switch (errorCode) {
        case 'anonymous_provider_disabled':
            return 'Anonymous sign-ins are disabled.';
        case 'bad_code_verifier':
            return 'The provided code verifier does not match the expected one.';
        case 'bad_json':
            return 'The HTTP body of the request is not valid JSON.';
        case 'bad_jwt':
            return 'JWT sent in the Authorization header is not valid.';
        case 'bad_oauth_callback':
            return 'OAuth callback from provider to Auth does not have all the required attributes.';
        case 'bad_oauth_state':
            return 'OAuth state is not in the correct format.';
        case 'captcha_failed':
            return 'Captcha challenge could not be verified.';
        case 'conflict':
            return 'General database conflict.';
        case 'email_address_not_authorized':
            return 'Email sending is not allowed for this address.';
        case 'email_conflict_identity_not_deletable':
            return 'Unlinking this identity causes the user\'s account to change to an email address which is already used by another user account.';
        case 'email_exists':
            return 'Email address already exists in the system.';
        case 'email_not_confirmed':
            return 'Please confirm your email address before signing in.';
        case 'email_provider_disabled':
            return 'Signups are disabled for email and password.';
        case 'flow_state_expired':
            return 'PKCE flow state has expired. Ask the user to sign in again.';
        case 'flow_state_not_found':
            return 'PKCE flow state no longer exists. Ask the user to sign in again.';
        case 'hook_payload_over_size_limit':
            return 'Payload from Auth exceeds maximum size limit.';
        case 'hook_timeout':
            return 'Unable to reach hook within maximum time allocated.';
        case 'hook_timeout_after_retry':
            return 'Unable to reach hook after maximum number of retries.';
        case 'identity_already_exists':
            return 'The identity is already linked to a user.';
        case 'identity_not_found':
            return 'Identity does not exist.';
        case 'insufficient_aal':
            return 'User must have a higher Authenticator Assurance Level.';
        case 'invite_not_found':
            return 'Invite is expired or already used.';
        case 'invalid_credentials':
            return 'Login credentials or grant type not recognized.';
        case 'manual_linking_disabled':
            return 'Calling the supabase.auth.linkUser() and related APIs is not enabled.';
        case 'mfa_challenge_expired':
            return 'MFA challenge expired. Request a new challenge.';
        case 'mfa_factor_name_conflict':
            return 'MFA factors for a single user should not have the same friendly name.';
        case 'mfa_factor_not_found':
            return 'MFA factor no longer exists.';
        case 'mfa_ip_address_mismatch':
            return 'The enrollment process for MFA factors must begin and end with the same IP address.';
        case 'mfa_verification_failed':
            return 'MFA challenge could not be verified -- wrong TOTP code.';
        case 'mfa_verification_rejected':
            return 'Further MFA verification is rejected.';
        case 'mfa_verified_factor_exists':
            return 'Verified phone factor already exists for a user.';
        case 'mfa_totp_enroll_disabled':
            return 'Enrollment of MFA TOTP factors is disabled.';
        case 'mfa_totp_verify_disabled':
            return 'Login via TOTP factors and verification of new TOTP factors is disabled.';
        case 'mfa_phone_enroll_disabled':
            return 'Enrollment of MFA Phone factors is disabled.';
        case 'mfa_phone_verify_disabled':
            return 'Login via Phone factors and verification of new Phone factors is disabled.';
        case 'no_authorization':
            return 'This HTTP request requires an Authorization header.';
        case 'not_admin':
            return 'User accessing the API is not admin.';
        case 'oauth_provider_not_supported':
            return 'Using an OAuth provider which is disabled.';
        case 'otp_disabled':
            return 'Sign in with OTPs is disabled.';
        case 'otp_expired':
            return 'OTP code for this sign-in has expired. Ask the user to sign in again.';
        case 'over_email_send_rate_limit':
            return 'Too many emails have been sent to this email address. Ask the user to wait a while before trying again.';
        case 'over_request_rate_limit':
            return 'Too many requests have been sent by this client. Ask the user to try again in a few minutes.';
        case 'over_sms_send_rate_limit':
            return 'Too many SMS messages have been sent to this phone number. Ask the user to wait a while before trying again.';
        case 'phone_exists':
            return 'Phone number already exists in the system.';
        case 'phone_not_confirmed':
            return 'Signing in is not allowed for this user as the phone number is not confirmed.';
        case 'phone_provider_disabled':
            return 'Signups are disabled for phone and password.';
        case 'provider_disabled':
            return 'OAuth provider is disabled for use.';
        case 'provider_email_needs_verification':
            return 'Supabase Auth requires emails to be verified.';
        case 'reauthentication_needed':
            return 'A user needs to reauthenticate to change their password.';
        case 'reauthentication_not_valid':
            return 'Verifying a reauthentication failed, the code is incorrect.';
        case 'request_timeout':
            return 'Processing the request took too long. Retry the request.';
        case 'same_password':
            return 'A user that is updating their password must use a different password than the one currently used.';
        case 'saml_assertion_no_email':
            return 'SAML assertion was received after sign in, but no email address was found in it.';
        case 'saml_assertion_no_user_id':
            return 'SAML assertion was received after sign in, but a user ID was not found in it.';
        case 'saml_entity_id_mismatch':
            return 'Updating the SAML metadata for a SAML identity provider is not possible, as the entity ID in the update does not match the entity ID in the database.';
        case 'saml_idp_already_exists':
            return 'Adding a SAML identity provider that is already added.';
        case 'saml_idp_not_found':
            return 'SAML identity provider not found.';
        case 'saml_metadata_fetch_failed':
            return 'Adding or updating a SAML provider failed as its metadata could not be fetched from the provided URL.';
        case 'saml_provider_disabled':
            return 'Using Enterprise SSO with SAML 2.0 is not enabled.';
        case 'saml_relay_state_expired':
            return 'SAML relay state is an object that tracks the progress of a supabase.auth.signInWithSSO() request.';
        case 'saml_relay_state_not_found':
            return 'SAML relay states are progressively cleaned up after they expire.';
        case 'session_not_found':
            return 'Session to which the API request relates no longer exists.';
        case 'signup_disabled':
            return 'Sign ups are disabled on the server.';
        case 'single_identity_not_deletable':
            return 'Every user must have at least one identity attached to it.';
        case 'sms_send_failed':
            return 'Sending an SMS message failed.';
        case 'sso_domain_already_exists':
            return 'Only one SSO domain can be registered per SSO identity provider.';
        case 'sso_provider_not_found':
            return 'SSO provider not found.';
        case 'too_many_enrolled_mfa_factors':
            return 'A user can only have a fixed number of enrolled MFA factors.';
        case 'unexpected_audience':
            return 'The request\'s X-JWT-AUD claim does not match the JWT\'s audience.';
        case 'unexpected_failure':
            return 'Auth service is degraded or a bug is present.';
        case 'user_already_exists':
            return 'User with this information cannot be created again as it already exists.';
        case 'user_banned':
            return 'User to which the API request relates has a banned_until property which is still active.';
        case 'user_not_found':
            return 'User to which the API request relates no longer exists.';
        case 'user_sso_managed':
            return 'When a user comes from SSO, certain fields of the user cannot be updated.';
        case 'validation_failed':
            return 'Provided parameters are not in the expected format.';
        case 'weak_password':
            return 'User is signing up or changing their password without meeting the password strength criteria.';
        default:
            return 'An unknown error occurred.';
    }
}