import Input from "../common/Input";
import Button from "../common/Button";

function LoginForm() {
  return (
    <form className="space-y-4">
      <Input
        type="email"
        placeholder="Enter Email"
      />

      <Input
        type="password"
        placeholder="Enter Password"
      />

      <Button text="Login" type="submit" />
    </form>
  );
}

export default LoginForm;