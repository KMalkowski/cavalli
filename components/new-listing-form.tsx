"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// Zod schema for horse listing form validation
const horseListingSchema = z.object({
  name: z.string().min(1, "Horse name is required").max(100, "Name too long"),
  breed: z.string().min(1, "Breed is required").max(50, "Breed name too long"),
  age: z.number().min(0, "Age must be positive").max(50, "Age seems too high"),
  height: z
    .number()
    .min(10, "Height must be at least 10hh")
    .max(20, "Height seems too high"),
  price: z.number().min(0, "Price must be positive"),
  currency: z
    .string()
    .min(1, "Currency is required")
    .max(3, "Invalid currency code"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description too long"),
  location: z
    .string()
    .min(1, "Location is required")
    .max(100, "Location too long"),
  imageUrl: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val === "") return true; // Allow empty/undefined
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    }, "Must be a valid URL"),
});

type HorseListingFormData = z.infer<typeof horseListingSchema>;

export function NewListingForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const createHorse = useMutation(api.horses.create);
  const currentUser = useQuery(api.auth.getCurrentUser);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<HorseListingFormData>({
    resolver: zodResolver(horseListingSchema),
    defaultValues: {
      name: "",
      breed: "",
      age: 0,
      height: 0,
      price: 0,
      currency: "USD",
      description: "",
      location: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: HorseListingFormData) => {
    console.log("Form data:", data);
    setIsSubmitting(true);
    try {
      const submitData = {
        ...data,
        imageUrl:
          data.imageUrl && data.imageUrl.trim() !== ""
            ? data.imageUrl
            : undefined,
      };

      console.log("Submitting data:", submitData);
      await createHorse(submitData);
      console.log("Submission successful");
      toast.success("Horse listing created successfully!");
      form.reset();
    } catch (error) {
      console.error("Error creating horse listing:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create horse listing. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (currentUser === null) {
    return (
      <div className={cn("w-full max-w-2xl mx-auto", className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Authentication Required</CardTitle>
            <CardDescription>
              You need to be logged in to create a horse listing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Please log in to access this feature.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Horse Listing</CardTitle>
          <CardDescription>
            Fill out the form below to create a new horse listing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (error) => {
                console.log(error);
              })}
              className="grid gap-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horse Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter horse name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="breed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Breed *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Thoroughbred, Quarter Horse"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age (years) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            field.onChange(isNaN(value) ? 0 : value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (hands) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="15.2"
                          {...field}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            field.onChange(isNaN(value) ? 0 : value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency *</FormLabel>
                      <FormControl>
                        <Input placeholder="USD" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        {...field}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          field.onChange(isNaN(value) ? 0 : value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location *</FormLabel>
                    <FormControl>
                      <Input placeholder="City, State/Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the horse, including temperament, training level, and any special features..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL (optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://example.com/horse-image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? "Creating Listing..." : "Create Horse Listing"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
