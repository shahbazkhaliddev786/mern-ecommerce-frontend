import { ContactForm } from './contact'

export default function ContactFormWrapper() {
    return (
        <section className="bg-white">
            <div className="flex justify-center max-w-7xl py-6 px-4 sm:py-24 sm:px-6 lg:px-8">
                <ContactForm />
            </div>
        </section>
    )
}
