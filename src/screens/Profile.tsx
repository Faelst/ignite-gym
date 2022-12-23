import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { ScreenHeader } from '@components/ScreenHeader'
import { Avatar } from '@components/Avatar'
import { useState } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

const PHOTO_SIZE = 33
const INPUT_COLOR = 'gray.400'

export function Profile() {
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/faelst.png')

  const toast = useToast()

  const handleSelectAvatar = async () => {
    setIsLoadingAvatar(true)
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      })

      if (photoSelected.canceled) {
        return
      }

      if (!photoSelected.assets[0].uri) {
        return
      }

      const file = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

      if (!file.exists && Number(file.size) / 1024 / 1024 > 3) {
        return toast.show({
          title: 'Essa imagem é muito grande. Escolha uma ate 3MB',
          bg: 'red.500',
          color: 'white',
          placement: 'top',
        })
      }

      setUserPhoto(photoSelected.assets[0].uri)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingAvatar(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView
        px={4}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
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
                source={{ uri: userPhoto }}
                alt="foto do usuário"
                size={PHOTO_SIZE}
              />

              <TouchableOpacity onPress={handleSelectAvatar}>
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

        <Input placeholder="Nome" bg={INPUT_COLOR} />
        <Input placeholder="E-mail" bg={INPUT_COLOR} isDisabled />

        <Heading
          color="gray.200"
          fontSize="md"
          mt={8}
          mb={5}
          fontFamily="heading"
        >
          Alterar Senha
        </Heading>
        <Input placeholder="Antiga senha" bg={INPUT_COLOR} secureTextEntry />

        <Input placeholder="Nova senha" bg={INPUT_COLOR} secureTextEntry />
        <Input
          placeholder="Confirmar a nova senha"
          bg={INPUT_COLOR}
          secureTextEntry
        />

        <Button title="Atualizar" mt={8} />
      </ScrollView>
    </VStack>
  )
}
