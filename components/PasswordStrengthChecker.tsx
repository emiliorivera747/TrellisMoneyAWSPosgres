import zxcvbn from 'zxcvbn';

function PasswordStrengthChecker({ password }: { password: String }) {
  console.log(password);

  if (!password) {
    return null;
  }
  const result = zxcvbn(password);
  const strengthScore = result.score; // 0-4, 4 being the strongest
  const feedback = result.feedback.warning; // Get warning messages

  // Map score to a strength label
  const strengthLabel = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][strengthScore];

  return (
    <div>
      <p>Strength: {strengthLabel}</p>
      {feedback && <p>{feedback}</p>}
    </div>
  );
}

export default PasswordStrengthChecker;