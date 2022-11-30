import { IInputProps, Input as NativeBaseInput } from "native-base"

export function Input({ ...rest }: IInputProps) {
    return (
        <NativeBaseInput
            {...rest}
            bg="gray.700"
            h={14}
            borderWidth={0}
            fontSize="md"
            color="gray.100"
            fontFamily="body"
            mb={4}
            placeholderTextColor="gray.300"
            _focus={{
                bg: "gray.700",
                borderWidth: 1,
                borderColor: "green.500"
            }}
        />
    )
}