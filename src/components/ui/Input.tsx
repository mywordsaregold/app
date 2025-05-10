import { IonInput } from "@ionic/react"
import { FC, useState } from "react"
import { ZodType } from "zod"

export type InputProps = {
  readonly label?: string
  readonly placeholder?: string
  readonly schema: ZodType
  readonly onChange: (value: string) => void
  readonly value: string
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
      errorText={validationResult.error?.errors?.[0]?.message}
      fill="outline"
      label={label}
      labelPlacement="floating"
      onIonBlur={() => setIsTouched(true)}
      onIonInput={event => onChange(event.target.value as string)}
      placeholder={placeholder}
      type="text"
    />
  )
}
