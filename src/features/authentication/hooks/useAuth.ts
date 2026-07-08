import { useMutation } from '@tanstack/react-query'
import { authService } from '../services/auth.service'
import type { LoginDto, SignupDto } from '../types'

export const useSignup = () => {
    return useMutation({
        mutationFn: (data: SignupDto) => authService.signup(data)
    })
}

export const useLogin = () => {
    return useMutation({
        mutationFn: (data: LoginDto) => authService.login(data)
    })
}
