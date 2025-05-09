import { IonSpinner } from '@ionic/react'
import { ComponentPropsWithoutRef, FC } from 'react'

export type SpinnerProps = ComponentPropsWithoutRef<typeof IonSpinner>

export const Spinner: FC<SpinnerProps> = props => {
  return <IonSpinner {...props} />
}
