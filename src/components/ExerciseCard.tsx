import { Heading, HStack, Icon, Image, Text, VStack } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { ExerciseDto } from '../dtos/ExercisesDTO'
import { api } from '../services/api'

type Props = TouchableOpacityProps & {
  exercise: ExerciseDto
}

export function ExerciseCard({ exercise, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="gray.500" alignItems="center" p={2} rounded="md" mb={5}>
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${exercise.thumb}`,
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
            {exercise.name}
          </Heading>

          <Text color="gray.200" fontSize="sm" numberOfLines={2}>
            {exercise.series} séries x {exercise.repetitions} repetições
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
