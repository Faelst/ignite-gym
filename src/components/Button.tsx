import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base'

type props = IButtonProps & {
  title: string
}

export function Button({ title, variant, ...rest }: props) {
  return (
    <NativeBaseButton
      {...rest}
      w="full"
      h={14}
      bg={variant == 'outline' ? 'transparent' : 'green.700'}
      borderWidth={variant == 'outline' ? 1 : 0}
      borderColor="green.500"
      rounded="sm"
      _pressed={{
        bg: variant == 'outline' ? 'gray.500' : 'green.500',
      }}
    >
      <Text
        color={variant == 'outline' ? 'green.500' : 'gray.100'}
        fontSize="sm"
        fontFamily="heading"
      >
        {title}
      </Text>
    </NativeBaseButton>
  )
}
