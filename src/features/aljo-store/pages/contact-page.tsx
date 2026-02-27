import { ContactForm } from '@/features/aljo-store/components/contact'

export default function ContactPage() {
    return (
        <section className="bg-white">
            <div className="flex justify-center max-w-7xl py-6 px-4 sm:py-24 sm:px-6 lg:px-8">
                <ContactForm />
            </div>
        </section>
    )
}
