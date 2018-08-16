import { ComponentClass, SFC } from 'react'

export type Component<P> = SFC<P> | ComponentClass<P>
