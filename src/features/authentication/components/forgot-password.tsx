import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'

export default function ForgotPassword() {
    return (
        <section className="container mx-auto px-4 py-16 flex justify-center">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="font-display text-3xl font-bold mb-2">Reset Password</h1>
                    <p className="text-muted-foreground">Enter your email and we'll send you a reset link</p>
                </div>

                <div className="bg-card border rounded-lg p-6 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    <Button className="w-full" size="lg">
                        Send Reset Link
                    </Button>
                </div>

                <div className="text-center mt-6">
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="h-4 w-4" /> Back to Login
                    </Link>
                </div>
            </div>
        </section>
    )
}
