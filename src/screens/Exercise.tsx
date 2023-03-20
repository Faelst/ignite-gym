import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { AppNavigatorRouterProps } from '@routes/app.routes'

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepsSvg from '@assets/repetitions.svg'
import { Button } from '@components/Button'
import { useCallback, useEffect, useState } from 'react'
import { AppError } from '../utils/AppError'
import { api } from '../services/api'
import { ExerciseDto } from '../dtos/ExercisesDTO'
import { Loading } from '../components/Loading'

type RouteParams = {
  exerciseId: string
}

export function Exercise() {
  const toast = useToast()
  const navigation = useNavigation<AppNavigatorRouterProps>()
  const route = useRoute()
  const [exercise, setExercise] = useState<ExerciseDto>({} as ExerciseDto)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitRegister, setIsSubmitRegister] = useState(false)

  const { exerciseId } = route.params as RouteParams

  useEffect(() => {
    fetchExerciseById()
  }, [exerciseId])

  const fetchExerciseById = async () => {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/exercises/${exerciseId}`)
      setExercise(data)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar o exercício. Tende mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bg: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleExerciseHistoryRegister = async () => {
    try {
      setIsSubmitRegister(true)
      await api.post(`/history`, {
        exercise_id: exerciseId,
      })

      toast.show({
        title: 'Parabéns! Exercício Realizado.',
        placement: 'top',
        bg: 'green.500',
      })

      navigation.navigate('history')
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível finalizar este exercício. Tende mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bg: 'red.500',
      })
    } finally {
      setIsSubmitRegister(false)
    }
  }

  return (
    <VStack flex={1}>
      <VStack px={5} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>
        <HStack my={4} alignItems="center" justifyContent="space-between">
          <Heading
            color="gray.100"
            fontSize="lg"
            fontWeight="bold"
            flexShrink={1}
          >
            {exercise?.name}
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text color="gray.100" fontSize="sm" ml={1}>
              {exercise?.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <VStack p={5}>
            <Image
              w="full"
              h={80}
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
              }}
              alt="Imagem do exercício"
              mb={4}
              resizeMode="cover"
              rounded="lg"
              overflow={'hidden'}
            />

            <Box bg="gray.600" p={5} rounded="lg">
              <HStack
                alignItems="center"
                justifyContent="space-between"
                px={6}
                my={3}
              >
                <HStack alignItems="center">
                  <SeriesSvg />
                  <Text color="gray.200" ml={2}>
                    {exercise?.series} Series
                  </Text>
                </HStack>

                <HStack alignItems="center">
                  <RepsSvg />
                  <Text color="gray.200" ml={2}>
                    {exercise?.repetitions} Repetições
                  </Text>
                </HStack>
              </HStack>

              <Button
                title="Marcar como realizado"
                mt={4}
                isLoading={isSubmitRegister}
                onPress={handleExerciseHistoryRegister}
              />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  )
}
