import { SignupForm } from "../signup/form";
import SignUpIllustration from "../signup/SignUpIllustration";

export default function SignInPage() {
  return (
    <div className="min-h-screen min-w-72 flex items-center justify-center">
      <div
        suppressHydrationWarning
        className="flex flex-col gap-8 border-2 border-solid border-black px-6 py-16 rounded-md"
      >
        <SignUpIllustration />
        <SignupForm isSignin={true} />
      </div>
    </div>
  );
}
