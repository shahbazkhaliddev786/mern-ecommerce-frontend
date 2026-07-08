import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button } from '@/shared/components/ui/button'

export default function VerifyEmail() {
    const navigate = useNavigate()
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const handleChange = (index: number, value: string) => {
        // Only allow numbers
        if (!/^[0-9]*$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value.substring(value.length - 1)
        setOtp(newOtp)

        // Move focus up
        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Move focus backward on backspace if empty
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const code = otp.join('')
        if (code.length !== 6) {
            toast.error('Please complete the 6-digit code')
            return
        }

        // Placeholder for future API wiring integration
        try {
            toast.success('Email verified successfully! (Mock)')
            // Temporarily navigate home after mock
            navigate('/')
        } catch {
            toast.error('Failed to verify OTP')
        }
    }

    return (
        <section className="container mx-auto px-4 py-16 flex justify-center">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="font-display text-3xl font-bold mb-2">Verify Email</h1>
                    <p className="text-muted-foreground">We sent a 6-digit code to your email.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-card border rounded-lg p-6 space-y-6">
                    <div className="flex justify-between gap-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputRefs.current[index] = el
                                }}
                                type="text"
                                inputMode="numeric"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-14 text-center text-xl font-bold rounded-md border border-input bg-background focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all"
                            />
                        ))}
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                        Verify Account
                    </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground mt-6">
                    Didn't receive a code? <button className="text-foreground font-medium hover:text-accent transition-colors">Resend</button>
                </p>
            </div>
        </section>
    )
}
