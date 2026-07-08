import { Fragment, type ReactNode } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { X } from 'lucide-react'

interface AdminModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: ReactNode
    footer?: ReactNode
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const maxWidthClasses = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl'
}

export function AdminModal({ isOpen, onClose, title, children, footer, maxWidth = 'md' }: AdminModalProps) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <DialogPanel
                                className={`relative flex max-h-[85vh] w-full transform flex-col overflow-hidden rounded-[2.5rem] bg-card text-left align-middle shadow-xl transition-all sm:my-8 ${maxWidthClasses[maxWidth]}`}>
                                <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-5">
                                    <DialogTitle as="h3" className="text-xl font-bold leading-6 text-foreground">
                                        {title}
                                    </DialogTitle>
                                    <button
                                        type="button"
                                        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                        onClick={onClose}>
                                        <span className="sr-only">Close</span>
                                        <X className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="overflow-y-auto px-6 py-6 text-sm text-muted-foreground">{children}</div>

                                {footer && (
                                    <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-border bg-muted/30 px-6 py-4 sm:flex-row sm:justify-end">
                                        {footer}
                                    </div>
                                )}
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
