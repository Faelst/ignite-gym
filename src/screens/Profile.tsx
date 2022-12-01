import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from 'native-base'

import { ScreenHeader } from '@components/ScreenHeader'
import { Avatar } from '@components/Avatar'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

const PHOTO_SIZE = 33

export function Profile() {
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false)
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView px={4}>
        <Center mt={6} px={10}>
          {isLoadingAvatar ? (
            <Skeleton
              width={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.600"
              endColor="gray.300"
            />
          ) : (
            <>
              <Avatar
                source={{ uri: 'https://github.com/faelst.png' }}
                alt="foto do usuário"
                size={PHOTO_SIZE}
              />

              <TouchableOpacity>
                <Text
                  color="green.500"
                  fontSize="md"
                  fontWeight="bold"
                  mt={3}
                  mb={8}
                >
                  Alterar foto
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Center>

        <Input placeholder="Nome" bg="gray.600" />
        <Input placeholder="E-mail" bg="gray.600" isDisabled />

        <Heading color="gray.200" fontSize="md" mt={8} mb={5}>
          Alterar Senha
        </Heading>
        <Input placeholder="Antiga senha" bg="gray.600" secureTextEntry />

        <Input placeholder="Nova senha" bg="gray.600" secureTextEntry />
        <Input
          placeholder="Confirmar a nova senha"
          bg="gray.600"
          secureTextEntry
        />

        <Button title="Atualizar" mt={8} />
      </ScrollView>
    </VStack>
  )
}
