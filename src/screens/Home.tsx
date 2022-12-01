import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { HStack, VStack } from 'native-base'
import { useState } from 'react'

export function Home() {
  const [groupSelected, setGroupSelected] = useState('')

  return (
    <VStack flex={1}>
      <HomeHeader />

      <HStack mt={6} px={2}>
        <Group
          name="costas"
          isActive={groupSelected === 'costa'}
          onPress={() => setGroupSelected('costa')}
        />
        <Group
          name="peito"
          isActive={groupSelected === 'peito'}
          onPress={() => setGroupSelected('peito')}
        />
      </HStack>
    </VStack>
  )
}
