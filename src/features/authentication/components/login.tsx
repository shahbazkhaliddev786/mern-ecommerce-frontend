import { Link } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'

export default function Login() {
    return (
        <section className="container mx-auto px-4 py-16 flex justify-center">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="font-display text-3xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-muted-foreground">Sign in to your Aljo Store account</p>
                </div>

                <div className="bg-card border rounded-lg p-6 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link to="/forgot-password" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                        <Input id="password" type="password" placeholder="••••••••" />
                    </div>
                    <Button className="w-full" size="lg">
                        Sign In
                    </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-6">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-foreground font-medium hover:text-accent transition-colors">
                        Sign up
                    </Link>
                </p>
            </div>
        </section>
    )
}
