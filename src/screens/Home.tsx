import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRouterProps } from '@routes/app.routes'
import { FlatList, Heading, HStack, Text, VStack } from 'native-base'
import { useState } from 'react'

export function Home() {
  const [groupSelected, setGroupSelected] = useState('costas')
  const [groups, setGroups] = useState(['costas', 'ombro', 'peito', 'perna'])
  const [exercises, setExercises] = useState([
    {
      name: 'Supino Reto',
      group: 'peito',
      description: 'Supino reto com barra',
      series: 3,
      repetitions: 10,
    },
    {
      name: 'Supino Reto',
      group: 'peito',
      description: 'Supino reto com barra',
      series: 3,
      repetitions: 10,
    },
  ])

  const navigation = useNavigation<AppNavigatorRouterProps>()

  const handleNavigateToExercise = () => {
    navigation.navigate('exercise')
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
      />

      <VStack flex={1} px={4}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleNavigateToExercise} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: 20,
          }}
        />
      </VStack>
    </VStack>
  )
}
