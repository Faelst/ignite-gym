import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { Heading, SectionList, Text, VStack } from 'native-base'
import { useState } from 'react'

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
  const [histories, setHistories] = useState(historyData)

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />

      <SectionList
        sections={histories}
        keyExtractor={(item, index) => `${item} - ${index}`}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section: { title } }) => (
          <Heading color="gray.200" fontSize="md" mb={3} mt={6}>
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
