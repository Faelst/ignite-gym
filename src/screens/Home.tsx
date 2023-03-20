import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRouterProps } from '@routes/app.routes'
import { FlatList, Heading, HStack, Text, useToast, VStack } from 'native-base'
import { useCallback, useEffect, useState } from 'react'
import { AppError } from '../utils/AppError'
import { api } from '../services/api'
import { ExerciseDto } from '../dtos/ExercisesDTO'
import { Loading } from '../components/Loading'

export function Home() {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [groupSelected, setGroupSelected] = useState('costas')
  const [groups, setGroups] = useState<string[]>([])
  const [exercises, setExercises] = useState<ExerciseDto[]>([])

  useEffect(() => {
    fetchGroups()
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup()
    }, [groupSelected]),
  )

  const navigation = useNavigation<AppNavigatorRouterProps>()

  const handleNavigateToExercise = (exerciseId: string) => {
    navigation.navigate('exercise', { exerciseId })
  }

  const fetchExercisesByGroup = async () => {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/exercises/bygroup/${groupSelected}`)
      setExercises(data)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os exercícios. Tende mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bg: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchGroups = async () => {
    try {
      const { data } = await api.get('groups')
      setGroups(data)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os grupos musculares. Tende mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bg: 'red.500',
      })
    }
  }

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toUpperCase() === item.toUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          px: 5,
        }}
        my={6}
        maxH={10}
        minH={10}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px={4}>
          <HStack justifyContent="space-between" mb={5}>
            <Heading color="gray.200" fontSize="md" fontFamily="heading">
              Exercícios
            </Heading>

            <Text color="gray.200" fontSize="sm">
              {exercises.length}
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                onPress={() => handleNavigateToExercise(item.id)}
                exercise={item}
              />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
              paddingBottom: 20,
            }}
          />
        </VStack>
      )}
    </VStack>
  )
}
