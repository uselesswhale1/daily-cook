import { AuthErrorCode } from '../enums/error-code.enum';

export const ErrorList = Object.freeze({
  [AuthErrorCode.ADMIN_ONLY_OPERATION]:
            'This operation is restricted to administrators only.',
  [AuthErrorCode.ARGUMENT_ERROR]: '',
  [AuthErrorCode.APP_NOT_AUTHORIZED]:
            "This app, identified by the domain where it's hosted, is not "
            + 'authorized to use Firebase Authentication with the provided API key. '
            + 'Review your key configuration in the Google API console.',
  [AuthErrorCode.APP_NOT_INSTALLED]:
            'The requested mobile application corresponding to the identifier ('
            + 'Android package name or iOS bundle ID) provided is not installed on '
            + 'this device.',
  [AuthErrorCode.CAPTCHA_CHECK_FAILED]:
            'The reCAPTCHA response token provided is either invalid, expired, '
            + 'already used or the domain associated with it does not match the list '
            + 'of whitelisted domains.',
  [AuthErrorCode.CODE_EXPIRED]:
            'The SMS code has expired. Please re-send the verification code to try '
            + 'again.',
  [AuthErrorCode.CORDOVA_NOT_READY]: 'Cordova framework is not ready.',
  [AuthErrorCode.CORS_UNSUPPORTED]: 'This browser is not supported.',
  [AuthErrorCode.CREDENTIAL_ALREADY_IN_USE]:
            'This credential is already associated with a different user account.',
  [AuthErrorCode.CREDENTIAL_MISMATCH]:
            'The custom token corresponds to a different audience.',
  [AuthErrorCode.CREDENTIAL_TOO_OLD_LOGIN_AGAIN]:
            'This operation is sensitive and requires recent authentication. Log in '
            + 'again before retrying this request.',
  [AuthErrorCode.DYNAMIC_LINK_NOT_ACTIVATED]:
            'Please activate Dynamic Links in the Firebase Console and agree to the terms and '
            + 'conditions.',
  [AuthErrorCode.EMAIL_CHANGE_NEEDS_VERIFICATION]:
            'Multi-factor users must always have a verified email.',
  [AuthErrorCode.EMAIL_EXISTS]:
            'The email address is already in use by another account.',
  [AuthErrorCode.EMULATOR_CONFIG_FAILED]:
            'Auth instance has already been used to make a network call. Auth can '
            + 'no longer be configured to use the emulator. Try calling '
            + '"useEmulator()" sooner.',
  [AuthErrorCode.EXPIRED_OOB_CODE]: 'The action code has expired.',
  [AuthErrorCode.EXPIRED_POPUP_REQUEST]:
            'This operation has been cancelled due to another conflicting popup being opened.',
  [AuthErrorCode.INTERNAL_ERROR]: 'An internal AuthError has occurred.',
  [AuthErrorCode.INVALID_APP_CREDENTIAL]:
            'The phone verification request contains an invalid application verifier.'
            + ' The reCAPTCHA token response is either invalid or expired.',
  [AuthErrorCode.INVALID_APP_ID]:
            'The mobile app identifier is not registed for the current project.',
  [AuthErrorCode.INVALID_AUTH]:
            "This user's credential isn't valid for this project. This can happen "
            + "if the user's token has been tampered with, or if the user isn't for "
            + 'the project associated with this API key.',
  [AuthErrorCode.INVALID_AUTH_EVENT]: 'An internal AuthError has occurred.',
  [AuthErrorCode.INVALID_CODE]:
            'The SMS verification code used to create the phone auth credential is '
            + 'invalid. Please resend the verification code sms and be sure use the '
            + 'verification code provided by the user.',
  [AuthErrorCode.INVALID_CONTINUE_URI]:
            'The continue URL provided in the request is invalid.',
  [AuthErrorCode.INVALID_CORDOVA_CONFIGURATION]:
            'The following Cordova plugins must be installed to enable OAuth sign-in: '
            + 'cordova-plugin-buildinfo, cordova-universal-links-plugin, '
            + 'cordova-plugin-browsertab, cordova-plugin-inappbrowser and '
            + 'cordova-plugin-customurlscheme.',
  [AuthErrorCode.INVALID_CUSTOM_TOKEN]:
            'The custom token format is incorrect. Please check the documentation.',
  [AuthErrorCode.INVALID_DYNAMIC_LINK_DOMAIN]:
            'The provided dynamic link domain is not configured or authorized for the current project.',
  [AuthErrorCode.INVALID_EMAIL]: 'The email address is badly formatted.',
  [AuthErrorCode.INVALID_API_KEY]:
            'Your API key is invalid, please check you have copied it correctly.',
  [AuthErrorCode.INVALID_CERT_HASH]:
            'The SHA-1 certificate hash provided is invalid.',
  [AuthErrorCode.INVALID_IDP_RESPONSE]:
            'The supplied auth credential is malformed or has expired.',
  [AuthErrorCode.INVALID_MESSAGE_PAYLOAD]:
            'The email template corresponding to this action contains invalid characters in its message. '
            + 'Please fix by going to the Auth email templates section in the Firebase Console.',
  [AuthErrorCode.INVALID_MFA_SESSION]:
            'The request does not contain a valid proof of first factor successful sign-in.',
  [AuthErrorCode.INVALID_OAUTH_PROVIDER]:
            'EmailAuthProvider is not supported for this operation. This operation '
            + 'only supports OAuth providers.',
  [AuthErrorCode.INVALID_OAUTH_CLIENT_ID]:
            'The OAuth client ID provided is either invalid or does not match the '
            + 'specified API key.',
  [AuthErrorCode.INVALID_ORIGIN]:
            'This domain is not authorized for OAuth operations for your Firebase '
            + 'project. Edit the list of authorized domains from the Firebase console.',
  [AuthErrorCode.INVALID_OOB_CODE]:
            'The action code is invalid. This can happen if the code is malformed, '
            + 'expired, or has already been used.',
  [AuthErrorCode.INVALID_PASSWORD]:
            'The password is invalid or the user does not have a password.',
  [AuthErrorCode.INVALID_PERSISTENCE]:
            'The specified persistence type is invalid. It can only be local, session or none.',
  [AuthErrorCode.INVALID_PHONE_NUMBER]:
            'The format of the phone number provided is incorrect. Please enter the '
            + 'phone number in a format that can be parsed into E.164 format. E.164 '
            + 'phone numbers are written in the format [+][country code][subscriber '
            + 'number including area code].',
  [AuthErrorCode.INVALID_PROVIDER_ID]: 'The specified provider ID is invalid.',
  [AuthErrorCode.INVALID_RECIPIENT_EMAIL]:
            'The email corresponding to this action failed to send as the provided '
            + 'recipient email address is invalid.',
  [AuthErrorCode.INVALID_SENDER]:
            'The email template corresponding to this action contains an invalid sender email or name. '
            + 'Please fix by going to the Auth email templates section in the Firebase Console.',
  [AuthErrorCode.INVALID_SESSION_INFO]:
            'The verification ID used to create the phone auth credential is invalid.',
  [AuthErrorCode.INVALID_TENANT_ID]:
            "The Auth instance's tenant ID is invalid.",
  [AuthErrorCode.MISSING_ANDROID_PACKAGE_NAME]:
            'An Android Package Name must be provided if the Android App is required to be installed.',
  [AuthErrorCode.MISSING_AUTH_DOMAIN]:
            'Be sure to include authDomain when calling firebase.initializeApp(), '
            + 'by following the instructions in the Firebase console.',
  [AuthErrorCode.MISSING_APP_CREDENTIAL]:
            'The phone verification request is missing an application verifier '
            + 'assertion. A reCAPTCHA response token needs to be provided.',
  [AuthErrorCode.MISSING_CODE]:
            'The phone auth credential was created with an empty SMS verification code.',
  [AuthErrorCode.MISSING_CONTINUE_URI]:
            'A continue URL must be provided in the request.',
  [AuthErrorCode.MISSING_IFRAME_START]: 'An internal AuthError has occurred.',
  [AuthErrorCode.MISSING_IOS_BUNDLE_ID]:
            'An iOS Bundle ID must be provided if an App Store ID is provided.',
  [AuthErrorCode.MISSING_OR_INVALID_NONCE]:
            'The request does not contain a valid nonce. This can occur if the '
            + 'SHA-256 hash of the provided raw nonce does not match the hashed nonce '
            + 'in the ID token payload.',
  [AuthErrorCode.MISSING_MFA_INFO]: 'No second factor identifier is provided.',
  [AuthErrorCode.MISSING_MFA_SESSION]:
            'The request is missing proof of first factor successful sign-in.',
  [AuthErrorCode.MISSING_PHONE_NUMBER]:
            'To send verification codes, provide a phone number for the recipient.',
  [AuthErrorCode.MISSING_SESSION_INFO]:
            'The phone auth credential was created with an empty verification ID.',
  [AuthErrorCode.MODULE_DESTROYED]:
            'This instance of FirebaseApp has been deleted.',
  [AuthErrorCode.MFA_INFO_NOT_FOUND]:
            'The user does not have a second factor matching the identifier provided.',
  [AuthErrorCode.MFA_REQUIRED]:
            'Proof of ownership of a second factor is required to complete sign-in.',
  [AuthErrorCode.NEED_CONFIRMATION]:
            'An account already exists with the same email address but different '
            + 'sign-in credentials. Sign in using a provider associated with this '
            + 'email address.',
  [AuthErrorCode.NETWORK_REQUEST_FAILED]:
            'A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.',
  [AuthErrorCode.NO_AUTH_EVENT]: 'An internal AuthError has occurred.',
  [AuthErrorCode.NO_SUCH_PROVIDER]:
            'User was not linked to an account with the given provider.',
  [AuthErrorCode.NULL_USER]:
            'A null user object was provided as the argument for an operation which '
            + 'requires a non-null user object.',
  [AuthErrorCode.OPERATION_NOT_ALLOWED]:
            'The given sign-in provider is disabled for this Firebase project. '
            + 'Enable it in the Firebase console, under the sign-in method tab of the '
            + 'Auth section.',
  [AuthErrorCode.OPERATION_NOT_SUPPORTED]:
            'This operation is not supported in the environment this application is '
            + 'running on. "location.protocol" must be http, https or chrome-extension'
            + ' and web storage must be enabled.',
  [AuthErrorCode.POPUP_BLOCKED]:
            'Unable to establish a connection with the popup. It may have been blocked by the browser.',
  [AuthErrorCode.POPUP_CLOSED_BY_USER]:
            'The popup has been closed by the user before finalizing the operation.',
  [AuthErrorCode.PROVIDER_ALREADY_LINKED]:
            'User can only be linked to one identity for the given provider.',
  [AuthErrorCode.QUOTA_EXCEEDED]:
            "The project's quota for this operation has been exceeded.",
  [AuthErrorCode.REDIRECT_CANCELLED_BY_USER]:
            'The redirect operation has been cancelled by the user before finalizing.',
  [AuthErrorCode.REDIRECT_OPERATION_PENDING]:
            'A redirect sign-in operation is already pending.',
  [AuthErrorCode.REJECTED_CREDENTIAL]:
            'The request contains malformed or mismatching credentials.',
  [AuthErrorCode.SECOND_FACTOR_ALREADY_ENROLLED]:
            'The second factor is already enrolled on this account.',
  [AuthErrorCode.SECOND_FACTOR_LIMIT_EXCEEDED]:
            'The maximum allowed number of second factors on a user has been exceeded.',
  [AuthErrorCode.TENANT_ID_MISMATCH]:
            "The provided tenant ID does not match the Auth instance's tenant ID",
  [AuthErrorCode.TIMEOUT]: 'The operation has timed out.',
  [AuthErrorCode.TOKEN_EXPIRED]:
            "The user's credential is no longer valid. The user must sign in again.",
  [AuthErrorCode.TOO_MANY_ATTEMPTS_TRY_LATER]:
            'We have blocked all requests from this device due to unusual activity. '
            + 'Try again later.',
  [AuthErrorCode.UNAUTHORIZED_DOMAIN]:
            'The domain of the continue URL is not whitelisted.  Please whitelist '
            + 'the domain in the Firebase console.',
  [AuthErrorCode.UNSUPPORTED_FIRST_FACTOR]:
            'Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.',
  [AuthErrorCode.UNSUPPORTED_PERSISTENCE]:
            'The current environment does not support the specified persistence type.',
  [AuthErrorCode.UNSUPPORTED_TENANT_OPERATION]:
            'This operation is not supported in a multi-tenant context.',
  [AuthErrorCode.UNVERIFIED_EMAIL]: 'The operation requires a verified email.',
  [AuthErrorCode.USER_CANCELLED]:
            'The user did not grant your application the permissions it requested.',
  [AuthErrorCode.USER_DELETED]:
            'There is no user record corresponding to this identifier. The user may '
            + 'have been deleted.',
  [AuthErrorCode.USER_DISABLED]:
            'The user account has been disabled by an administrator.',
  [AuthErrorCode.USER_MISMATCH]:
            'The supplied credentials do not correspond to the previously signed in user.',
  [AuthErrorCode.USER_SIGNED_OUT]: '',
  [AuthErrorCode.WEAK_PASSWORD]:
            'The password must be 6 characters long or more.',
  [AuthErrorCode.WEB_STORAGE_UNSUPPORTED]:
            'This browser is not supported or 3rd party cookies and data may be disabled.',
  default: 'Something went wrong !',
});

export default ErrorList;
