import { Heading, HStack, Icon, Image, Text, VStack } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Entypo } from '@expo/vector-icons'

type Props = TouchableOpacityProps & {}

export function ExerciseCard({ ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="gray.500" alignItems="center" p={2} rounded="md" mb={5}>
        <Image
          source={{
            uri: 'https://www.wikihow.com/images_en/thumb/d/db/Work-Your-Back-With-Dumbbells-Step-2-Version-5.jpg/v4-460px-Work-Your-Back-With-Dumbbells-Step-2-Version-5.jpg',
          }}
          alt="Exercício de costas"
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="cover"
        />

        <VStack flex={1} ml={4} justifyContent="center">
          <Heading color="gray.100" fontSize="md" fontFamily="heading">
            Remada curvada
          </Heading>

          <Text color="gray.200" fontSize="sm" numberOfLines={2}>
            3 séries x 10 repetições
          </Text>
        </VStack>

        <Icon
          as={Entypo}
          name="chevron-thin-right"
          color="gray.300"
          size={4}
          pr={5}
        />
      </HStack>
    </TouchableOpacity>
  )
}
