import { IonInput } from "@ionic/react"
import { FC, useState } from "react"
import { ZodType } from "zod"

export type InputProps = {
  label?: string
  placeholder?: string
  schema: ZodType
  onChange: (value: string) => void
  value: string
}

export const Input: FC<InputProps> = ({
  label,
  placeholder,
  schema,
  onChange,
  value,
}) => {
  const [ isTouched, setIsTouched ] = useState(false)
  const validationResult = schema.safeParse(value)
  let className = validationResult.success ? "ion-valid" : "ion-invalid"
  if (isTouched) {
    className += " ion-touched"
  }
  return (
    <IonInput
      className={className}
      type="text"
      fill="outline"
      label={label}
      labelPlacement="floating"
      placeholder={placeholder}
      errorText={validationResult.error?.errors?.[0]?.message}
      onIonInput={event => onChange(event.target.value as string)}
      onIonBlur={() => setIsTouched(true)}
    />
  )
}
