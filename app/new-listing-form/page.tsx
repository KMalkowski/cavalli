import { NewListingForm } from '@/components/new-listing-form'

export const metadata = {
  title: 'Utwórz ogłoszenie konia',
  description: 'Utwórz nowe ogłoszenie konia na sprzedaż',
}

export default function NewListingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <NewListingForm />
    </div>
  )
}
