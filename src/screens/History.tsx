import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { Heading, SectionList, Text, VStack, useToast } from 'native-base'
import { useCallback, useEffect, useState } from 'react'
import { AppError } from '../utils/AppError'
import { api } from '../services/api'
import { useFocusEffect } from '@react-navigation/native'

const historyData = [
  {
    title: '20/10/2021',
    data: [
      {
        name: 'Costas',
        exercise: 'Puxada Frontal',
        time: '08:30',
      },
      {
        name: 'Costas',
        exercise: 'Puxada Frontal',
        time: '08:30',
      },
    ],
  },
  {
    title: '20/10/2021',
    data: [
      {
        name: 'Costas',
        exercise: 'Puxada Frontal',
        time: '08:30',
      },
      {
        name: 'Costas',
        exercise: 'Puxada Frontal',
        time: '08:30',
      },
    ],
  },
]

export function History() {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [histories, setHistories] = useState(historyData)

  useFocusEffect(
    useCallback(() => {
      fetchHistory()
    }, []),
  )

  const fetchHistory = async () => {
    try {
      setIsLoading(true)
      const { data } = await api.get('/history')
      setHistories(data)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar o historico. Tende mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bg: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory()
    }, []),
  )

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />

      <SectionList
        sections={histories}
        keyExtractor={(item, index) => `${item} - ${index}`}
        renderItem={({ item }) => <HistoryCard histories={histories} />}
        renderSectionHeader={({ section: { title } }) => (
          <Heading
            color="gray.200"
            fontSize="md"
            mb={3}
            mt={6}
            fontFamily="heading"
          >
            {title}
          </Heading>
        )}
        px={4}
        contentContainerStyle={
          histories.length === 0 && {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }
        }
        ListEmptyComponent={
          <Text color="gray.200" fontSize="md" textAlign="center">
            Nenhum exercício realizado. {`\n`} Vamos treinar hoje?
          </Text>
        }
      />
    </VStack>
  )
}
