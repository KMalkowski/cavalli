'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

// Schemat Zod do walidacji formularza ogłoszenia konia
const horseListingSchema = z.object({
  name: z
    .string()
    .min(1, 'Nazwa konia jest wymagana')
    .max(100, 'Nazwa za długa'),
  breed: z.string().min(1, 'Rasa jest wymagana').max(50, 'Nazwa rasy za długa'),
  age: z
    .number()
    .min(0, 'Wiek musi być dodatni')
    .max(50, 'Wiek wydaje się za wysoki'),
  height: z
    .number()
    .min(10, 'Wysokość musi wynosić co najmniej 10hh')
    .max(20, 'Wysokość wydaje się za wysoka'),
  price: z.number().min(0, 'Cena musi być dodatnia'),
  currency: z
    .string()
    .min(1, 'Waluta jest wymagana')
    .max(3, 'Nieprawidłowy kod waluty'),
  description: z
    .string()
    .min(10, 'Opis musi mieć co najmniej 10 znaków')
    .max(1000, 'Opis za długi'),
  location: z
    .string()
    .min(1, 'Lokalizacja jest wymagana')
    .max(100, 'Lokalizacja za długa'),
  imageUrl: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val === '') return true // Pozwól na puste/niezdefiniowane
      try {
        new URL(val)
        return true
      } catch {
        return false
      }
    }, 'Musi być prawidłowym adresem URL'),
})

type HorseListingFormData = z.infer<typeof horseListingSchema>

export function NewListingForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const createHorse = useMutation(api.horses.create)
  const currentUser = useQuery(api.auth.getCurrentUser)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<HorseListingFormData>({
    resolver: zodResolver(horseListingSchema),
    defaultValues: {
      name: '',
      breed: '',
      age: 0,
      height: 0,
      price: 0,
      currency: 'PLN',
      description: '',
      location: '',
      imageUrl: '',
    },
  })

  const onSubmit = async (data: HorseListingFormData) => {
    console.log('Form data:', data)
    setIsSubmitting(true)
    try {
      const submitData = {
        ...data,
        imageUrl:
          data.imageUrl && data.imageUrl.trim() !== ''
            ? data.imageUrl
            : undefined,
      }

      console.log('Submitting data:', submitData)
      await createHorse(submitData)
      console.log('Submission successful')
      toast.success('Ogłoszenie konia zostało utworzone pomyślnie!')
      form.reset()
    } catch (error) {
      console.error('Error creating horse listing:', error)
      toast.error(
        error instanceof Error
          ? error.message
          : 'Nie udało się utworzyć ogłoszenia konia. Spróbuj ponownie.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (currentUser === null) {
    return (
      <div className={cn('mx-auto w-full max-w-2xl', className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Wymagana autoryzacja</CardTitle>
            <CardDescription>
              Musisz być zalogowany, aby utworzyć ogłoszenie konia.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center">
              Zaloguj się, aby uzyskać dostęp do tej funkcji.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={cn('mx-auto w-full max-w-2xl', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Utwórz ogłoszenie konia</CardTitle>
          <CardDescription>
            Wypełnij poniższy formularz, aby utworzyć nowe ogłoszenie konia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (error) => {
                console.log(error)
              })}
              className="grid gap-6"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nazwa konia *</FormLabel>
                      <FormControl>
                        <Input placeholder="Wprowadź nazwę konia" {...field} />
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
                      <FormLabel>Rasa *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="np. Thoroughbred, Quarter Horse"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wiek (lata) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value)
                            field.onChange(isNaN(value) ? 0 : value)
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
                      <FormLabel>Wysokość (łokcie) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="15.2"
                          {...field}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value)
                            field.onChange(isNaN(value) ? 0 : value)
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
                      <FormLabel>Waluta *</FormLabel>
                      <FormControl>
                        <Input placeholder="PLN" {...field} />
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
                    <FormLabel>Cena *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Wprowadź cenę"
                        {...field}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value)
                          field.onChange(isNaN(value) ? 0 : value)
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
                    <FormLabel>Lokalizacja *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Miasto, Województwo/Kraj"
                        {...field}
                      />
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
                    <FormLabel>Opis *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Opisz konia, w tym temperament, poziom wyszkolenia i wszelkie szczególne cechy..."
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
                    <FormLabel>URL obrazu (opcjonalne)</FormLabel>
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
                {isSubmitting
                  ? 'Tworzenie ogłoszenia...'
                  : 'Utwórz ogłoszenie konia'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
