import ReCAPTCHA from 'react-google-recaptcha';
const RecaptchaProtection = ({
  reference,
}: {
  reference: React.RefObject<ReCAPTCHA>;
}) => {
  return (
    <ReCAPTCHA
      sitekey="6Lcjl3cgAAAAAKE-Dj5sZ5dIvVLdEAc7CPScWwgC"
      size="invisible"
      ref={reference}
      theme={'light'}
    />
  );
};

export default RecaptchaProtection;
