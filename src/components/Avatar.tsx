import { IImageProps, Image } from 'native-base'

type Props = IImageProps & {
  size: number
}

export function Avatar({ size, ...rest }: Props) {
  return (
    <Image
      {...rest}
      w={size}
      h={size}
      borderRadius="full"
      borderWidth={2}
      borderColor="gray.400"
    />
  )
}
