import { Center, ScrollView, VStack } from 'native-base'

import { ScreenHeader } from '@components/ScreenHeader'
import { Avatar } from '@components/Avatar'

export function Profile() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView>
        <Center mt={6} px={10}>
          <Avatar
            source={{ uri: 'https://github.com/faelst.png' }}
            alt="foto do usuário"
            size={33}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}
