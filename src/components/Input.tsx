import { FormControl, IInputProps, Input as NativeBaseInput } from 'native-base'

type Props = IInputProps & {
  error?: string | null
}

export function Input({ error = null, isInvalid, ...rest }: Props) {
  const invalid = !!error || isInvalid

  return (
    <FormControl isInvalid={invalid}>
      <NativeBaseInput
        bg="gray.700"
        h={14}
        borderWidth={0}
        fontSize="md"
        color="gray.100"
        fontFamily="body"
        mb={4}
        placeholderTextColor="gray.300"
        _focus={{
          bg: 'gray.700',
          borderWidth: 1,
          borderColor: 'green.500',
        }}
        {...rest}
        isInvalid={isInvalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',
        }}
      />

      <FormControl.ErrorMessage
        color="red.500"
        fontSize="sm"
        fontFamily="body"
        mt={-3}
        mb={3}
      >
        {error}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}
