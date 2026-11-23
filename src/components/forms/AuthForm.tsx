import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import type { DefaultValues, FieldValues, Path } from 'react-hook-form'
import { toast } from 'sonner'
import type { ZodType } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import ROUTES from '@/constants/routes'
import type { ActionResponse } from '@/types'

interface AuthFormProps<T extends FieldValues> {
  formType: 'SIGN_IN' | 'SIGN_UP'
  schema: ZodType<T>
  defaultValues: T
  onSubmit: (data: T) => Promise<ActionResponse>
}

const AuthForm = <T extends FieldValues>({
  formType,
  schema,
  defaultValues,
  onSubmit,
}: AuthFormProps<T>) => {
  const navigate = useNavigate()
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  })

  const handleSubmit = async (data: T) => {
    const result = await onSubmit(data)

    if (result.success) {
      toast.success(
        formType === 'SIGN_IN' ? 'Signed in successfully' : 'Account created',
      )
      await navigate({ to: ROUTES.HOME })
    } else {
      toast.error(result.error?.message ?? 'Something went wrong')
    }
  }

  // In the Next.js version this JSX was returned from inside handleSubmit,
  // so the form never rendered. It belongs here, in the component body.
  const buttonText = formType === 'SIGN_IN' ? 'Sign in' : 'Sign up'

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-10 space-y-6"
      >
        {Object.keys(defaultValues).map((name) => (
          <FormField
            key={name}
            control={form.control}
            name={name as Path<T>}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2.5">
                <FormLabel className="paragraph-medium text-dark400_light700">
                  {field.name === 'email'
                    ? 'Email Address'
                    : field.name[0].toUpperCase() + field.name.slice(1)}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    type={
                      field.name === 'password'
                        ? 'password'
                        : field.name === 'email'
                          ? 'email'
                          : 'text'
                    }
                    className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          disabled={form.formState.isSubmitting}
          className="primary-gradient paragraph-medium w-full rounded-2 px-2 py-3 min-h-12 font-inter text-light-900"
        >
          {form.formState.isSubmitting
            ? formType === 'SIGN_IN'
              ? 'Signing in...'
              : 'Signing up...'
            : buttonText}
        </Button>

        {formType === 'SIGN_IN' ? (
          <p>
            Don't have an account?{' '}
            <Link
              to={ROUTES.SIGN_UP}
              className="paragraph-semibold primary-text-gradient"
            >
              Sign up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <Link
              to={ROUTES.SIGN_IN}
              className="paragraph-semibold primary-text-gradient"
            >
              Sign in
            </Link>
          </p>
        )}
      </form>
    </Form>
  )
}

export default AuthForm
