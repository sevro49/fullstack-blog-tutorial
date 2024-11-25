import { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "@/features/authSlice";
import { AppDispatch } from "@/store/store";

type RegisterErrorResponse = {
  error: {
    error: string; // Gelen hata mesajı burada
  };
};

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null); // Clear previous errors

    const result = await dispatch(registerUser({ email, username, password }));

    if(registerUser.fulfilled.match(result)) {
      const login = await dispatch(loginUser({ email, password }));
      if(loginUser.fulfilled.match(login)) {
        navigate('/');
      } else if (loginUser.rejected.match(login)) {
        // Type assertion to safely extract the error
        const errorResponse = result.payload as RegisterErrorResponse | undefined;
  
        // Extract error message or set a default error
        setErrorMsg(errorResponse?.error.error || "An unknown error occurred");
      }
    } else if (registerUser.rejected.match(result)) {
      // Type assertion to safely extract the error
      const errorResponse = result.payload as RegisterErrorResponse | undefined;
      // Extract error message or set a default error
      setErrorMsg(errorResponse?.error.error || "An unknown error occurred");
    }
  }
  
  return (
    <section id='sign-up' className='min-h-screen h-full w-full flex items-center justify-center'>
      <div className='px-6 bg-stone-300 w-full h-screen flex items-center justify-center'>
        <div className="bg-white rounded-md p-4 max-w-[25rem] w-full">
          <h2 className="text-center text-2xl font-semibold text-stone-700">Sign Up</h2>
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col justify-center gap-5">
            <div>
              <Label htmlFor="email" className="text-stone-700">Email</Label>
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
              <Label htmlFor="username" className="text-stone-700">Username</Label>
              <Input
                autoComplete="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                placeholder="Username"
                className="focus-visible:ring-stone-700"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-stone-700">Password</Label>
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
              <Link to="/login">
                <span className="text-xs underline">Have an account?</span>
              </Link>
            </div>
            <div className="w-full">
              <Button className="w-full bg-stone-600 hover:bg-stone-700 text-white border border-stone-600">Sign Up</Button>
            </div>
          </form>
        </div>
      </div>
      <div className='hidden lg:flex bg-stone-600 w-full h-screen object-fill'>
        <img src="/assets/register-bg.webp" alt="login-background" className="object-cover w-full h-full opacity-60 object-top"/>
      </div>
    </section>
  )
}

export default Register