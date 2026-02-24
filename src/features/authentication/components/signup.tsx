import { Link } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'

export default function Signup() {
    return (
        <section className="container mx-auto px-4 py-16 flex justify-center">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="font-display text-3xl font-bold mb-2">Create Account</h1>
                    <p className="text-muted-foreground">Join Aljo Store and start shopping</p>
                </div>

                <div className="bg-card border rounded-lg p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Doe" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" type="password" placeholder="••••••••" />
                    </div>
                    <Button className="w-full" size="lg">
                        Create Account
                    </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-foreground font-medium hover:text-accent transition-colors">
                        Log in
                    </Link>
                </p>
            </div>
        </section>
    )
}
