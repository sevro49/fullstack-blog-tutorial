import { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "@/features/authSlice";
import { AppDispatch } from "@/store/store";

type LoginErrorResponse = {
  error: {
    error: string; // Gelen hata mesajı burada
  };
};

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null); // Clear previous errors

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      navigate('/');
    } else if (loginUser.rejected.match(result)) {
      // Type assertion to safely extract the error
      const errorResponse = result.payload as LoginErrorResponse | undefined;

      // Extract error message or set a default error
      setErrorMsg(errorResponse?.error.error || "An unknown error occurred");
    }
  };

  return (
    <section id="login" className="min-h-screen h-full w-full flex items-center justify-center">
      <div className="hidden lg:flex bg-stone-600 w-full h-screen object-fill">
        <img
          src="/assets/login-bg.webp"
          alt="login-background"
          className="object-cover w-full h-full opacity-60"
        />
      </div>
      <div className="px-6 bg-stone-300 w-full h-screen flex items-center justify-center">
        <div className="bg-white rounded-md p-4 max-w-[25rem] w-full">
          <h2 className="text-center text-2xl font-semibold text-stone-700">Log in</h2>
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col justify-center gap-5">
            <div>
              <Label htmlFor="email" className="text-stone-700">
                Email
              </Label>
              <Input
                autoComplete="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="Email"
                className="focus-visible:ring-stone-700"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-stone-700">
                Password
              </Label>
              <Input
                autoComplete="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="Password"
                className="focus-visible:ring-stone-700"
                required
              />
            </div>
            {errorMsg && (
              <p className="text-red-600 text-sm text-center">{errorMsg}</p> // Render errorMsg as string
            )}
            <div>
              <Link to="/signup">
                <span className="text-xs underline">Don't have an account?</span>
              </Link>
            </div>
            <div className="w-full">
              <Button
                type="submit"
                className="w-full bg-stone-600 hover:bg-stone-700 border-stone-600 text-white"
              >
                Log in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
