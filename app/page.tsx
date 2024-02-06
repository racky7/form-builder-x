import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col h-full justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl text-white">🔐 Auth</h1>
        <p className="text-white text-lg">
          Authentication service in Nextjs using next-auth-v5
        </p>
        <LoginButton>
          <Button size="lg" variant="secondary">
            Log in
          </Button>
        </LoginButton>
      </div>
    </div>
  );
}
