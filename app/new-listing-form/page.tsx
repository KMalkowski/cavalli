import { NewListingForm } from "@/components/new-listing-form";

export const metadata = {
  title: "Create Horse Listing",
  description: "Create a new horse listing for sale",
};

export default function NewListingPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <NewListingForm />
    </div>
  );
}
