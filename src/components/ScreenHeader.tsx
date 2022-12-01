import { Center, Heading, Text } from 'native-base'

type Props = {
  title: string
}

export function ScreenHeader({ title }: Props) {
  return (
    <Center pb={6} bg="gray.600" pt={16}>
      <Heading color="gray.100" fontSize="xl">
        {title}
      </Heading>
    </Center>
  )
}
