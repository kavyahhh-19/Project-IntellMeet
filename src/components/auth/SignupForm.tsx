import Input from "../common/Input";
import Button from "../common/Button";

function SignupForm() {
  return (
    <form className="space-y-4">
      <Input placeholder="Full Name" />

      <Input
        type="email"
        placeholder="Email"
      />

      <Input
        type="password"
        placeholder="Password"
      />

      <Button
        text="Create Account"
        type="submit"
      />
    </form>
  );
}

export default SignupForm;